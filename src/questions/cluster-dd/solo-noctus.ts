import { TDocumentDefinitions } from "pdfmake/interfaces";
import { FigmaHelpers, UserInfo } from "./utils";
import path from 'path';
const fs = require('fs');
const util = require('util');

const clusterItem = {
  text: 'SOLO NOCTUS can be found in open terrain blooming under a wide-open night sky and will not thrive in constrained environments. Similar to Sui Inspira, this creative species grows from a bulb that contains everything it needs to succeed. Solo Noctus is tenacious and dedicated, waiting until conditions are perfect to put all its energy into growing a single, densely-petaled flower. A Solo Noctus does poorly in captivity, so those who want to see its fabled flower in person should be prepared to stay up late, because this creative species only blooms at night. Individuals who are part of this species thrive in unrestricted freedom and bloom on their own schedule, but should not limit their creativity to such a rare environment. When conditions aren’t perfect, Solo Noctus should embrace the ingenious solutions that can emerge from creative limits.',
  scroll_img: path.join(__dirname, '..', '/images/solo_noctus_scroll.png'),
  text_img: path.join(__dirname, '..', '/images/solo_noctus_title.svg'),
  width: 555,
  height: 949,
  x: 131,
  y: 15,
  titleWidth: 466,
  titleHeight: 159,
  titleX: 154,
  titleY: 798
};

export const createDD = async (website: string, helpers: FigmaHelpers, userInfo: UserInfo) : Promise<TDocumentDefinitions> => {
  const { figmaXtoPdf, figmaYtoPdf, totalWidth, totalHeight } = helpers;

  const readFile = util.promisify(fs.readFile);
  const image = await readFile(clusterItem.scroll_img);
  const text = await readFile(clusterItem.text_img);

  const sharedHabits = userInfo.habits.filter(x => x.type === 'cluster');
  const userHabits = userInfo.habits.filter(x => x.type === 'user');

  const habits = [...sharedHabits, ...userHabits];
  const habitsCols = habits.reduce<Array<typeof habits>>((acc, cv) => {
    if (acc[acc.length - 1].length > 7) {
      acc.push([]);
    }

    acc[acc.length - 1].push(cv);
    return acc;
  }, [[]]);

  const getHabitsColumn = (index: number): typeof habits => {
    if (habitsCols.length < index + 1) {
      return [];
    }

    return habitsCols[index];
  }

  return {
    pageSize: 'TABLOID',
    pageMargins: [40, 60, 40, 20],
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
          },
          {
            x: figmaXtoPdf(608),
            y: figmaYtoPdf(1092),
            type: 'ellipse',
            color: '#252424',
            r1: 2, r2: 2
          },
          {
            x: figmaXtoPdf(612),
            y: figmaYtoPdf(1161),
            w: figmaXtoPdf(141),
            h: figmaYtoPdf(32),
            r: figmaXtoPdf(20),
            type: 'rect',
            color: '#FFFBF0',
            lineWidth: 0.5,
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
          y: figmaYtoPdf(964)
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
          // FIRST COLUMN
          {
            layout: {
              hLineWidth: function (i) {
                if (i === 1) {
                  return 0.5;
                }
                
                return 0;
              },
              vLineWidth: function (i, node) {
                return 0;
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
              widths: [figmaXtoPdf(120)],
              body: [
                [
                  {
                    text: 'Your Creative Species',
                    font: 'Millionaire',
                    fontSize: figmaXtoPdf(11),
                    color: '#252424',
                    fontWeight: 400,
                    lineHeight: 12/11,
                    headlineLevel: 7,
                    
                  },
                ],
                [
                  {
                    table: {
                      widths: [figmaXtoPdf(103)],
                      body: [
                        [
                          {
                            text: `${userInfo.percentage}% of Solo Noctus's creative habits overlap with yours`,
                            font: 'GtAmericaMono',
                            italics: true,
                            fontSize: figmaXtoPdf(8.5),
                            color: '#252424',
                            fontWeight: 300,
                          }
                        ],
                      ]
                    },
                    layout: {
                      hLineWidth: function (i, node) {
                        return 0
                      },
                      vLineWidth: function (i, node) {
                        return 0
                      }
                    },
                  },
                ]
              ]
            }
          },
          // FIRST COLUMN END
          // SECOND COLUMN
          {
            layout: {
              hLineWidth: function (i) {
                if (i === 1) {
                  return 0.5;
                }
                
                return 0;
              },
              vLineWidth: function (i, node) {
                return 0;
              },
              hLineColor: function (i, node) {
                return 'rgba(37,36,36,0.8)';
              },
              vLineColor: function (i, node) {
                return 'rgba(37,36,36,0.8)';
              },
            },
            absolutePosition: {
              x: figmaXtoPdf(188),
              y: figmaYtoPdf(1084),
            },
            table: {
              widths: [figmaXtoPdf(557)],
              body: [
                [
                  {
                    text: 'Your Creative Habits',
                    font: 'Millionaire',
                    fontSize: figmaXtoPdf(11),
                    color: '#252424',
                    fontWeight: 400,
                    lineHeight: 12/11,
                    headlineLevel: 7,
                  },
                ],
                [
                  {
                    table: {
                      widths: ['*', '*', '*', '*'],
                      body: [
                        [
                          {
                            absolutePosition: {
                              x: figmaXtoPdf(182),
                              y: figmaYtoPdf(1107),
                            },
                            ul: [...getHabitsColumn(0).map(s => 
                              ({
                                text: s,
                                font: 'GtAmericaMono',
                                italics: true,
                                fontSize: figmaXtoPdf(8.5),
                                color: '#252424',
                                fontWeight: 300,
                                listType: s.type === 'cluster' ? undefined : 'none'
                              }))
                            ],
                            font: 'Millionaire',
                          },
                          {
                            absolutePosition: {
                              x: figmaXtoPdf(327),
                              y: figmaYtoPdf(1107),
                            },
                            ul: [...getHabitsColumn(1).map(s => 
                              ({
                                text: s,
                                font: 'GtAmericaMono',
                                italics: true,
                                fontSize: figmaXtoPdf(8.5),
                                color: '#252424',
                                fontWeight: 300,
                                listType: s.type === 'cluster' ? undefined : 'none'
                              }))
                            ],
                            font: 'Millionaire',
                          },
                          {
                            absolutePosition: {
                              x: figmaXtoPdf(468),
                              y: figmaYtoPdf(1107),
                            },
                            ul: [...getHabitsColumn(2).map(s => 
                              ({
                                text: s,
                                font: 'GtAmericaMono',
                                italics: true,
                                fontSize: figmaXtoPdf(8.5),
                                color: '#252424',
                                fontWeight: 300,
                                listType: s.type === 'cluster' ? undefined : 'none'
                              }))
                            ],
                            font: 'Millionaire',
                          },
                          {
                            absolutePosition: {
                              x: figmaXtoPdf(610),
                              y: figmaYtoPdf(1107),
                            },
                            ul: [...getHabitsColumn(3).map(s => 
                              ({
                                text: s,
                                font: 'GtAmericaMono',
                                italics: true,
                                fontSize: figmaXtoPdf(8.5),
                                color: '#252424',
                                fontWeight: 300,
                                listType: s.type === 'cluster' ? undefined : 'none'
                              }))
                            ],
                            font: 'Millionaire',
                          },
                        ],
                      ]
                    },
                    layout: {
                      hLineWidth: function (i, node) {
                        return 0
                      },
                      vLineWidth: function (i, node) {
                        return 0
                      }
                    },
                  },
                ]
              ]
            }
          },

          // END OF SECOND COLUMN
          // Shared habits note
          {
            absolutePosition: {
              x: figmaXtoPdf(556),
              y: figmaYtoPdf(1087)
            },
            text: 'Habits with  are shared with Solo Noctus',
            font: 'GtAmericaMono',
            italics: true,
            fontSize: figmaXtoPdf(7),
          },
          // END OF SHARED HABITS NOTE
          // RESULTS BUTTON
          {
            absolutePosition: {
              x: figmaXtoPdf(620),
              y: figmaYtoPdf(1163)
            },
            width: figmaXtoPdf(97),
            height: figmaYtoPdf(29),
            alignment: 'center',
            text: 'return to',
            font: 'Millionaire',
            fontSize: figmaXtoPdf(8),
            link: website + userInfo.id, 
          },
          {
            absolutePosition: {
              x: figmaXtoPdf(620),
              y: figmaYtoPdf(1176)
            },
            width: figmaXtoPdf(97),
            height: figmaYtoPdf(29),
            alignment: 'center',
            text: 'MY RESULTS',
            font: 'Millionaire',
            fontSize: figmaXtoPdf(11),
            link: website + userInfo.id, 
          },
          // END OF RESULTS BUTTON
        ],
      
      }
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