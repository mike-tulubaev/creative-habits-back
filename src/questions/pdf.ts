import PdfPrinter from 'pdfmake';
import { createDD as createFocusMononovous } from './cluster-dd/focus-mononovous';
import { createDD as createMonoRoutinus } from './cluster-dd/mono-routinus';
import { createDD as createNovoGregarious } from './cluster-dd/novo-gregarious';
import { createDD as creteSocialisAdventorous } from './cluster-dd/socialis-adventorous';
import { createDD as createSoloNoctus } from './cluster-dd/solo-noctus';
import { createDD as createSuiInspira } from './cluster-dd/sui-inspira';
import { createFigmaHelpers } from './cluster-dd/utils';
import { createDD as createYoloChaotis } from './cluster-dd/yolo-chaotis';
const fs = require('fs');
const util = require('util');

const WEBSITE = 'https://thecreativelandscape.com/';

const species = {
  'Mono Routinus': createMonoRoutinus,
  'Yolo Chaotis': createYoloChaotis,
  'Socialis Adventurous': creteSocialisAdventorous,
  'Focus Mononovous': createFocusMononovous,
  'Novo Gregarious': createNovoGregarious,
  'Sui Inspira': createSuiInspira,
  'Solo Noctus': createSoloNoctus
};

const fonts = {
  GtAmericaMono: {
    normal: __dirname + '/fonts/gt_america_mono/GT-America-Mono-Regular.ttf',
    bold: __dirname + '/fonts/gt_america_mono/GT-America-Mono-Medium.ttf',
    italics: __dirname + '/fonts/gt_america_mono/GT-America-Mono-Light.ttf',
    bolditalics: __dirname + '/fonts/gt_america_mono/GT-America-Mono-Regular.ttf'
  },
  Millionaire: {
    normal: __dirname + '/fonts/millionaire/Millionaire-Roman.ttf',
    bold: __dirname + '/fonts/millionaire/millionaire_roman-webfont.ttf',
    italics: __dirname + '/fonts/millionaire/millionaire_italic-webfont.ttf',
    bolditalics: __dirname + '/fonts/millionaire/millionaire_roman-webfont.ttf'
  }
};

const createPdf = async (data) => {
  const printer = new PdfPrinter(fonts);
  const createDD = species[data.Creative_Species];

  const pageSize = {
    width: 792,
    height: 1224
  };

  const scale = 1;
  
  const helpers = createFigmaHelpers(pageSize, scale);

  const docDefinition = await createDD(WEBSITE, helpers, {
    id: data.id,
    percentage: Math.round(data[`${data.Creative_Species}_percent`]),
    habits: [
      ...data['Habits_Clus_shared'].map((d) => ({
        type: 'cluster',
        text: d
      })),
      ...data['Habits_unique'].map((d) => ({
        type: 'user',
        text: d
      }))
    ]
  });

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
