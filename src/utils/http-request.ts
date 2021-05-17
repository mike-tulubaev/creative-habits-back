const http = require('http');

export const httpPost = (url: { hostname: any, port: any, path: string }, postBody: any) => {
  const data = JSON.stringify(postBody);

  const options = {
      ...url,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
      }
  }

  return new Promise((resolve, reject) => {
      const req = http.request(options, res => {
          const chunks: any[] = [];

          res.on('data', d => {
              chunks.push(d);
          });

          res.on('end', () => {
              try {
              const body = Buffer.concat(chunks).toString().replace(/NaN/g, '-1');
              console.log('incoming: ' + body);
              const result = JSON.parse(body);
              resolve(result);
              }
              catch {
                resolve({error: 'unexpected error occured'});
              }
          })
      })

      req.on('error', error => {
          reject(error);
      });

      req.write(data)
      req.end()
  })
}