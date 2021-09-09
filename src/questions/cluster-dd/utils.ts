export type FigmaHelpers = {
  figmaXtoPdf: (x: number) => number,
  figmaYtoPdf: (x: number) => number,
  totalWidth: () => number,
  totalHeight: () => number,
};

export type UserInfo = {
  percentage: number,
  habits: Array<{
    type: 'cluster',
    text: string
  } | { 
    type: 'user',
    text: string
  }>
}

export const createFigmaHelpers = (pageSize: { width: number, height: number}, scale): FigmaHelpers => ({
  figmaXtoPdf: (num: number) => num / pageSize.width * scale * pageSize.width,
  figmaYtoPdf: (num: number) => num / pageSize.height * scale * pageSize.height,
  totalWidth: () => scale * pageSize.width,
  totalHeight: () => scale * pageSize.height,
});
