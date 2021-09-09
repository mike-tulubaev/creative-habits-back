import { TDocumentDefinitions } from "pdfmake/interfaces";
import { FigmaHelpers, UserInfo } from "./utils";
import path from 'path';
const fs = require('fs');
const util = require('util');

const clusterItem = {
  text: 'YOLO CHAOTIS is best known for its many, varied, and sometimes wild thickets of bright flowers. A novelty-seeker like Novo Gregarious, this creative species thrives in mountain streams, where the current can carry it to new and changing environments. Unlike Socialis Adventurous, which draws nutrients from its environment, Yolo Chaotis has all it needs to thrive contained within its bulb, and will spread its energy across many new flowers at once, even if conditions aren’t perfect. Since Yolo Chaotis is inwardly-energized, in the right conditions the careful observer may even see a subtle glow emanating from deep inside this special creative species. Individuals who are part of this species have an enviable collection of creative habits, but because their ideas are often novel and unconventional, they risk being misunderstood and dismissed. To give their ideas the best chance of success, Yolo Chaotis should understand that patience and clear communication is necessary to sharing radical creative solutions.',
  scroll_img: path.join(__dirname, '..', '/images/yolov_haotis_scroll.png'),
  text_img: path.join(__dirname, '..', '/images/yolov_haotis_title.svg'),
  width: 542,
  height: 962,
  x: 123,
  y: 21,
  titleWidth: 479,
  titleHeight: 158,
  titleX: 170,
  titleY: 780
};

export const createDD = async (website: string, helpers: FigmaHelpers, userInfo: UserInfo) : Promise<TDocumentDefinitions> => {
  const { figmaXtoPdf, figmaYtoPdf, totalWidth, totalHeight } = helpers;

  const readFile = util.promisify(fs.readFile);
  const image = await readFile(clusterItem.scroll_img);
  const text = await readFile(clusterItem.text_img);
  return {
    pageSize: 'TABLOID',
    background: [
      {
        canvas: [
          {
            type: 'rect',
            x: 0, y: 0, w: totalWidth(), h: totalHeight(),
            color: '#FFFBF0'
          },
          {
            type: 'rect',
            x: figmaXtoPdf(15),
            y: figmaYtoPdf(15),
            w: totalWidth() - 2 * figmaXtoPdf(15),
            h: totalHeight() - 2 * figmaYtoPdf(15),
            r: figmaXtoPdf(20),
            lineWidth: 1,
            lineColor: '#252424'
          }
        ]
      }
    ],
    content: [
      {
        svg: text.toString(),
        width: figmaXtoPdf(clusterItem.titleWidth),
        height: figmaYtoPdf(clusterItem.titleHeight),
        absolutePosition: {
          x: figmaXtoPdf(clusterItem.titleX),
          y: figmaYtoPdf(clusterItem.titleY)
        }
      },
      {
        image: 'cluster', //svg: image.toString(),
        width: figmaXtoPdf(clusterItem.width),
        height: figmaYtoPdf(clusterItem.height),
        absolutePosition: { x: figmaXtoPdf(clusterItem.x), y: figmaYtoPdf(clusterItem.y) }
      },
      {
        absolutePosition: {
          x: figmaXtoPdf(47),
          y: figmaYtoPdf(947)
        },
        stack: [
          {
            layout: 'noBorders',
            table: {
              widths: [figmaXtoPdf(700)],
              headerRows: 1,
              body: [
                [
                  {
                    text: [{
                      text: clusterItem.text,
                      font: 'Millionaire',
                      fontSize: figmaXtoPdf(11),
                      color: '#252424',
                      fontWeight: 400,
                      lineHeight: 12/11
                    }],
                  }
                ],
              ],
            }
          },
          
          {
            layout: {
              hLineWidth: function (i, node) {
                return i == 1 ? 0.5 : 0;
              },
              vLineWidth: function (i, node) {
                return i === 3 ? 1 : 0;
              },
              hLineColor: function (i, node) {
                return 'rgba(37,36,36,0.8)';
              },
              vLineColor: function (i, node) {
                return 'rgba(37,36,36,0.8)';
              },
            },
            absolutePosition: {
              x: figmaXtoPdf(47),
              y: figmaYtoPdf(1084),
            },
            table: {
              widths: [figmaXtoPdf(135), figmaXtoPdf(135), figmaXtoPdf(135), figmaXtoPdf(135), figmaXtoPdf(135), figmaXtoPdf(135), figmaXtoPdf(135)],
              headerRows: 1,
              body: [
                [
                  {
                    text: 'Your Creative Species',
                    font: 'Millionaire',
                    fontSize: figmaXtoPdf(11),
                    color: '#252424',
                    fontWeight: 400,
                    lineHeight: 12/11
                  },
                ],
                [
                  {
                    layout: {
                      hLineWidth: function (i, node) {
                        return 0
                      },
                      vLineWidth: function (i, node) {
                        return 0
                      },
                    },
                    table: {
                      widths: [figmaXtoPdf(103)],
                      body: [
                        [{
                          text: `${userInfo.percentage}% of Yolo Chaotis's creative habits overlap with yours`,
                          font: 'GtAmericaMono',
                          italics: true,
                          fontSize: figmaXtoPdf(8.5),
                          color: '#252424',
                          fontWeight: 300,
                        },]
                      ]
                    }
                  }
                ]
              ]
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
}