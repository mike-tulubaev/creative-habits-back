import * as PdfPrinter from 'pdfmake';
const fs = require('fs');
const util = require('util');

const species = {
  'Mono Routinus': {
    text: 'MONO ROUTINUS typically grows its best blooms while alone, preferring enclosed environments where it can find predictable conditions in which to spread its roots. Similar to Solo Noctus, this creative species does not take chances with its precious resources, and only begins growing a bloom when all conditions are perfect. Those who come across a Mono Routinus in the wild should be respectful of its privacy and careful not to disturb its process. Although it does not produce flowers at the speed of some other species, if given the right conditions, Mono Routinus will reliably produce perfect blooms throughout its remarkably productive life.',
    scroll_img: __dirname + '/images/mono_routinus_scroll.png',
    text_img: __dirname + '/images/mono_routinus_title.svg',
    width: 2104,
    height: 4620,
    x: 710,
    y: 100,
    titleWidth: 2131,
    titleHeight: 716,
    titleX: 607,
    titleY: 3233
  },
  'Yolo Chaotis': {
    text: 'YOLO CHAOTIS is best known for its many, varied, and sometimes wild thickets of bright flowers. A novelty-seeker like Novo Gregarious, this creative species thrives in mountain streams, where the current can carry it to new and changing environments. Unlike Socialis Adventurous, which draws nutrients from its environment, Yolo Chaotis has all it needs to thrive contained within its bulb, and will spread its energy across many new flowers at once, even if conditions aren’t perfect. Since Yolo Chaotis is inwardly-energized, in the right conditions the careful observer may even see a subtle glow emanating from deep inside this special creative species.',
    scroll_img: __dirname + '/images/yolov_haotis_scroll.png',
    text_img: __dirname + '/images/yolov_haotis_title.svg',
    width: 2164,
    height: 3846,
    x: 670,
    y: 106,
    titleWidth: 1861,
    titleHeight: 618,
    titleX: 820,
    titleY: 3232
  },
  'Socialis Adventurous': {
    text: 'SOCIALIS ADVENTUROUS is characterized by its many blooms that take flight to ride air currents in search of new landscapes. A highly-social creative species, Socialis Adventurous is found in habitats dense with others, its roots flowing out to collect a wide range of nutrients, the more the better. Like Yolo Chaotis, Socialis Adeventurous liberally spreads its energy across many blooms at once, knowing that even though not all of them will flourish, those blooms that do, will be strong and vivid. Those who would like to see the best of this creative species will need to rise early, because many Socialis Adventurous prefer to show their brightest colors in the morning.',
    scroll_img: __dirname + '/images/socialis_adventurous_scroll.png',
    text_img: __dirname + '/images/socialis_adventurous_title.svg',
    width: 4350,
    height: 3377,
    x: -300,
    y: 300,
    titleWidth: 2755 + 314.33 + 188.1,
    titleHeight: 23.64 + 297.99 + 298.24 + 150,
    titleX: 171,
    titleY: 3221.62
  },
  'Focus Mononovous': {
    text: 'FOCUS MONONOVOUS is a detailed and dignified creative species that, like Novo Gregarious, travels streams and rivers in search of novel, unconstrained environments. Single-minded and precise, Focus Mononovous requires calm and quiet to focus its energy into growing a colorful, perfectly-formed bloom. Although many creative species can thrive in indoor environments, Focus Mononovous grows best in the wild, unconstrained and free. Those who find a Focus Mononovous in the wild should be careful not to distract it, otherwise it may have to start its flowering process over again.',
    scroll_img: __dirname + '/images/focus_mononovous_scroll.png',
    text_img: __dirname + '/images/focus_mononovous_title.svg',
    width: 2327,
    height: 3837,
    x: 593,
    y: 186,
    titleWidth: 3181,
    titleHeight: 614,
    titleX: 228,
    titleY: 3224
  },
  'Novo Gregarious': {
    text: 'NOVO GREGARIOUS is a highly-social creative species that thrives in noisy, bustling environments, its roots floating down stream to absorb nutrients, and the abundant energy emanated by the species around it. Community is Novo Gregarious’ primary motivating force, so it often does not bloom until encouraged to do so by others around it. A vibrant and joyful species, Novo Gregarious has the unique ability to bring together species that otherwise would bloom alone. Creative species spotters who would like to see a Novo Gregarious bloom, should bring a friend along, play music, and can encourage its flowering with a lively conversation.',
    scroll_img: __dirname + '/images/novo_gregarious_scroll.png',
    text_img: __dirname + '/images/novo_gregarious_title.svg',
    width: 4974,
    height: 3573,
    x: -458,
    y: 236,
    titleWidth: 2726,
    titleHeight: 728,
    titleX: 446,
    titleY: 3224
  },
  'Sui Inspira': {
    text: 'SUI INSPIRA is found in quiet, enclosed habitats, protected from passersby and far from other flora and fauna. This unique and magical creative species requires a predictable environment and has a deeply-rooted bulb that contains all the nutrients it needs to grow. Because it is so self-sufficient, Sui Inspira is happy in isolation, diligently growing its intricate, gently-glowing bloom. Those who come across a Sui Inspira in the wild should be quiet, respectful, and let it bloom in peace.',
    scroll_img: __dirname + '/images/sui_inspira_scroll.png',
    text_img: __dirname + '/images/sui_inspira_title.svg',
    width: 2115,
    height: 3800,
    x: 827.56,
    y: 186,
    titleWidth: 1724,
    titleHeight: 728,
    titleX: 875,
    titleY: 3224
  },
  'Solo Noctus': {
    text: 'SOLO NOCTUS can be found in open terrain blooming under a wide-open night sky and will not thrive in constrained environments. Similar to Sui Inspira, this creative species grows from a bulb that contains everything it needs to succeed. Solo Noctus is tenacious and dedicated, waiting until conditions are perfect to put all its energy into growing a single, densely-petaled flower. A Sui Inspira does poorly in captivity, so those who want to see its fabled flower in person should be prepared to stay up late, because this creative species only blooms at night.',
    scroll_img: __dirname + '/images/solo_noctus_scroll.png',
    text_img: __dirname + '/images/solo_noctus_title.svg',
    width: 2223,
    height: 3697,
    x: 687,
    y: 100,
    titleWidth: 499.33 + 1111.38 + 185.29,
    titleHeight: 610.47,
    titleX: 853,
    titleY: 3226.67
  }
}

const fonts = {
  GtAmericaMono: {
    normal: __dirname + '/fonts/gt_america_mono/GT-America-Mono-Regular.ttf',
    bold: __dirname + '/fonts/gt_america_mono/GT-America-Mono-Medium.ttf',
    italics: __dirname + '/fonts/gt_america_mono/GT-America-Mono-Light.ttf',
    bolditalics: __dirname + '/fonts/gt_america_mono/GT-America-Mono-Regular.ttf'
  },
  Millionaire: {
    normal: __dirname + '/fonts/millionaire/millionaire_roman-webfont.ttf',
    bold: __dirname + '/fonts/millionaire/millionaire_roman-webfont.ttf',
    italics: __dirname + '/fonts/millionaire/millionaire_italic-webfont.ttf',
    bolditalics: __dirname + '/fonts/millionaire/millionaire_roman-webfont.ttf'
  }
};

const createPdf = async (data) => {
  const printer = new PdfPrinter(fonts);
  const item = species[data.Creative_Species];

  const readFile = util.promisify(fs.readFile);
  const image = await readFile(item.scroll_img);
  const text = await readFile(item.text_img);

  const scale = 10;
  const figmaXtoPdf = (num) => num / 3600 * scale * 595.28;
  const figmaYtoPdf = (num) => num / 4800 * scale * 793.71;

  const clusTopHabits: string[][] = [];

  const userTopHabits: string[][] = []

  let currentIndex = 0;
  data.Clus_Top_Habits.forEach((item: string) => {
    if (!clusTopHabits[currentIndex]) {
      clusTopHabits[currentIndex] = [];
    }

    clusTopHabits[currentIndex].push(item);
    if (clusTopHabits[currentIndex].length === 7 ||
      (clusTopHabits[currentIndex].length === 6 && clusTopHabits[currentIndex].indexOf('Stimulated By Constraints') > -1)) {
      currentIndex++;
    }
  });

  currentIndex = 0;

  data.Habits_All.forEach((item: string) => {
    if (!userTopHabits[currentIndex]) {
      userTopHabits[currentIndex] = [];
    }

    userTopHabits[currentIndex].push(item);
    if (userTopHabits[currentIndex].length === 7 ||
      (userTopHabits[currentIndex].length === 6 && userTopHabits[currentIndex].indexOf('Stimulated By Constraints') > -1)) {
      currentIndex++;
    }
  });

  const docDefinition = {
    pageSize: {
      width: scale * 595.28,
      height: scale * 793.71
    },
    background: [
      {
        canvas: [
          {
            type: 'rect',
            x: 0, y: 0, w: scale * 595.28, h: scale * 793.71,
            color: '#FFFBF0'
          },
          {
            type: 'rect',
            x: figmaXtoPdf(100),
            y: figmaYtoPdf(100),
            w: scale * 595.28 - 2 * figmaXtoPdf(100),
            h: scale * 793.71 - 2 * figmaYtoPdf(100),
            r: figmaXtoPdf(240),
            lineWidth: 1,
            lineColor: '#252424'
          }
        ]
      },
      {
        image: 'cluster', //svg: image.toString(),
        width: figmaXtoPdf(item.width),
        height: figmaYtoPdf(item.height),
        absolutePosition: { x: figmaXtoPdf(item.x), y: figmaYtoPdf(item.y) }
      },
    ],
    content: [
      {
        svg: text.toString(),
        width: figmaXtoPdf(item.titleWidth),
        height: figmaYtoPdf(item.titleHeight),
        absolutePosition: {
          x: figmaXtoPdf(item.titleX),
          y: figmaYtoPdf(item.titleY)
        }
      },
      {
        absolutePosition: {
          x: figmaXtoPdf(280),
          y: figmaYtoPdf(3967)
        },
        stack: [
          {
            layout: 'noBorders',
            table: {
              widths: [figmaXtoPdf(2938)],
              headerRows: 1,
              body: [
                [
                  {
                    text: [{
                      text: item.text,
                      font: 'Millionaire',
                      fontSize: figmaXtoPdf(40),
                      color: '#252424',
                      lineHeight: 40/54,
                    }],
                  }
                ],
              ],
            }
          },
          {
            layout: {
              hLineWidth: function (i, node) {
                return 0
              },
              vLineWidth: function (i, node) {
                return i === 3 ? 1 : 0;
              },
              hLineColor: function (i, node) {
                return 'black';
              },
              vLineColor: function (i, node) {
                return 'rgba(37,36,36,0.8)';
              },
            },
            absolutePosition: {
              x: figmaXtoPdf(280),
              y: figmaYtoPdf(4308),
            },
            table: {
              widths: [figmaXtoPdf(419.7), figmaXtoPdf(419.7), figmaXtoPdf(419.7), figmaXtoPdf(419.7), figmaXtoPdf(419.7), figmaXtoPdf(419.7), figmaXtoPdf(419.7)],
              headerRows: 1,
              body: [
                [
                  {
                    stack: [
                      ...(
                        ['SUI INSPIRA', 'SOLO NOCTUS'].includes(data.Creative_Species.toUpperCase()) ?
                          [data.Creative_Species.toUpperCase()] :
                          data.Creative_Species.toUpperCase().split(' ')
                      ).map((c: string) => ({
                        text: c,
                        font: 'Millionaire',
                        margin: [figmaXtoPdf(2), figmaYtoPdf(-20), 0, 0],
                        fontSize: figmaXtoPdf(40),
                        color: '#252424',
                      })),
                      {
                        text: 'Creative Habits',
                        fontSize: figmaXtoPdf(40),
                        margin: [0, figmaYtoPdf(-15), 0, 0],
                        font: 'Millionaire',
                        italics: true,
                        color: '#252424',
                      }
                    ]
                  },
                  {
                    stack: (clusTopHabits[0] || []).map(r => ({
                      text: r,
                      font: 'GtAmericaMono',
                      fontSize: figmaXtoPdf(28),
                      color: '#252424',
                    }))
                  },
                  {
                    stack: (clusTopHabits[1] || []).map(r => ({
                      text: r,
                      font: 'GtAmericaMono',
                      fontSize: figmaXtoPdf(28),
                      color: '#252424',
                    }))
                  },
                  {
                    stack: [
                      {
                        text: 'YOUR',
                        margin: [figmaXtoPdf(42), figmaYtoPdf(-20), 0, 0],
                        font: 'Millionaire',
                        fontSize: figmaXtoPdf(40),
                        color: '#252424',
                      },
                      {
                        text: 'Creative Habits',
                        margin: [figmaXtoPdf(40), figmaYtoPdf(-15), 0, 0],
                        fontSize: figmaXtoPdf(40),
                        font: 'Millionaire',
                        italics: true,
                        color: '#252424',
                      },
                      {
                        text: 'Learn More',
                        margin: [figmaXtoPdf(40), 0, 0, 0],
                        link: 'https://hackingcreativity.stage.sharp-dev.net/' + data.id,
                        fontSize: figmaXtoPdf(28),
                        font: 'GtAmericaMono',
                        decoration: 'underline',
                        italics: true,
                        color: '#252424',
                      }
                    ]
                  },
                  {
                    stack: (userTopHabits[0] || []).map(r => ({
                      text: r,
                      font: 'GtAmericaMono',
                      fontSize: figmaXtoPdf(28),
                      color: '#252424',
                    }))
                  },
                  {
                    stack: (userTopHabits[1] || []).map(r => ({
                      text: r,
                      font: 'GtAmericaMono',
                      fontSize: figmaXtoPdf(28),
                      color: '#252424',
                    }))
                  },
                  {
                    stack: (userTopHabits[2] || []).map(r => ({
                      text: r,
                      font: 'GtAmericaMono',
                      fontSize: figmaXtoPdf(28),
                      color: '#252424',
                    }))
                  },
                ],
              ],
            }
          }
        ]
      }

      // getGtContent('First paragraph'),
      // getGtContent('Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'),
    ],
    styles: {
      tableText: {
        margin: [figmaXtoPdf(316), figmaYtoPdf(3967)]
      },
      tableHabits: {
        margin: [figmaXtoPdf(316), figmaYtoPdf(4000)]
      }
    },
    images: {
      cluster: 'data:image/png;base64,' + image.toString('base64')
    }
  };


  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  return new Promise((resolve, reject) => {
    try {
      var chunks: any[] = [];
      pdfDoc.on('data', chunk => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.end();
    } catch (err) {
      reject(err);
    }
  });
}

export {
  createPdf
};
