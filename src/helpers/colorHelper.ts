export const getTextColorBasedOnBg = (bgColor: string): string => {
  const r = parseInt(bgColor.substring(1, 3), 16);
  const g = parseInt(bgColor.substring(3, 5), 16);
  const b = parseInt(bgColor.substring(5, 7), 16);
  const color = (r * 299 + g * 587 + b * 114) / 1000;

  return color > 128 ? "#000000" : "#ffffff";
};

export const getRandomColor = (): string => {
  const randomIndex: number = Math.floor(Math.random() * COLOR_PALETTES.length);

  return COLOR_PALETTES[randomIndex];
};

const COLOR_PALETTES: Array<string> = [
  "#264653",
  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#e76f51",
  "#cdb4db",
  "#ffc8dd",
  "#ffafcc",
  "#bde0fe",
  "#a2d2ff",
  "#ef476f",
  "#ffd166",
  "#06d6a0",
  "#118ab2",
  "#073b4c",
  "#ffbe0b",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff",
  "#000814",
  "#001d3d",
  "#003566",
  "#ffc300",
  "#ffd60a",
  "#e63946",
  "#f1faee",
  "#a8dadc",
  "#457b9d",
  "#1d3557",
  "#22223b",
  "#4a4e69",
  "#9a8c98",
  "#c9ada7",
  "#f2e9e4",
  "#390099",
  "#9e0059",
  "#ff0054",
  "#ff5400",
  "#ffbd00",
  "#34a0a4",
  "#168aad",
  "#1a759f",
  "#1e6091",
  "#184e77",
  "#ff99c8",
  "#fcf6bd",
  "#d0f4de",
  "#a9def9",
  "#e4c1f9",
];
