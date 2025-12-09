const ROW_COUNT = 25;
const COLUMN_COUNT = 6;

const image = [
  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1,
  0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0,
  0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1,
  0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0,
  1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0,
  1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0,
  1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0,
  1, 0, 0, 1
];

const display = [];
const layersCount = image.length / (ROW_COUNT * COLUMN_COUNT);

const showDisplay = () => {
  console.log(display.join('\n'));
};


const makeLine = () => {
  let pixelCount = 0;
  const line = [];

  for (let row = 0; row < ROW_COUNT; row++) {
    const pixelColor = parseInt(image[pixelCount++]);

    line.push(pixelColor);
  }

  return line;
};

const plotPixels = () => {
  for (let index = 0; index < layersCount; index++) {
    const layer = [];

    for (let cols = 0; cols < COLUMN_COUNT; cols++) {
      layer.push(...makeLine());
    }

    display.push(layer);
  }
};

plotPixels();
showDisplay();