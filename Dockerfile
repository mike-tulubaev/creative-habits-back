FROM amancevice/pandas:1.0.3-alpine
WORKDIR /app
RUN apk add  --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.12/main/ nodejs=12.21.0-r0 && \
    apk add  --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.12/main/ npm=12.21.0-r0
COPY ./ /app

RUN set -ex && \
    apk add --no-cache gcc musl-dev g++ && \
    set -ex && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto1 && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto-wrapper && \
    rm -f /usr/bin/x86_64-alpine-linux-musl-gcj
    
RUN npm ci && \
    cd /app/survey && \
    pip3 list && \
    pip3 install -r requirements.txt


EXPOSE 3000

CMD /app/startup.sh