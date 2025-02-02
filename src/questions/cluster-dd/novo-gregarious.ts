import { TDocumentDefinitions } from "pdfmake/interfaces";
import { FigmaHelpers, UserInfo } from "./utils";
import path from 'path';
const fs = require('fs');
const util = require('util');

const clusterItem = {
  text: 'NOVO GREGARIOUS is a highly-social creative species that thrives in noisy, bustling environments, its roots floating down stream to absorb nutrients, and the abundant energy emanated by the species around it. Community is Novo Gregarious’ primary motivating force, so it often does not bloom until encouraged to do so by others around it. A vibrant and joyful species, Novo Gregarious has the unique ability to bring together species that otherwise would bloom alone. Creative species spotters who would like to see a Novo Gregarious bloom, should bring a friend along, play music, and can encourage its flowering with a lively conversation. Individuals who are part of this species feed their creative process by taking time to absorb the abundant inspiration the world has to offer. Novo Gregarious harnesses this creative energy by exploring many possible solutions to creative problems, but because they draw inspiration from so many sources, they can sometimes struggle with the convergent thinking needed to nurture one specific creative solution. ',
  scroll_img: path.join(__dirname, '..', '/images/novo_gregarious_scroll.png'),
  text_img: path.join(__dirname, '..', '/images/novo_gregarious_title.svg'),
  width: 876,
  height: 942,
  x: -14,
  y: 3,
  titleWidth: 687,
  titleHeight: 184,
  titleX: 50,
  titleY: 770
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
        image: 'cluster', //svg: image.toString(),
        width: figmaXtoPdf(clusterItem.width),
        height: figmaYtoPdf(clusterItem.height),
        absolutePosition: { x: figmaXtoPdf(clusterItem.x), y: figmaYtoPdf(clusterItem.y) }
      },
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
        absolutePosition: {
          x: figmaXtoPdf(47),
          y: figmaYtoPdf(932)
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
                            text: `${userInfo.percentage}% of Novo Gregarious's creative habits overlap with yours`,
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
            text: 'Habits with  are shared with Novo Gregarious',
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