///* 123456789012 */
// 3 pixel x 2 pixel
// ROW X COLUMN
// import { image } from "./input.js";
/* 
Layer 1: [[1,2,3]
         [4,5,6]]
Layer 2: [[7,8,9]
         [0,1,2]]
*/
const image = '123456789012';
const display = [];
const ROW_COUNT = 3/* 25 */;
const COLUMN_COUNT = 2/* 6 */;

const layersCount = image.length / (ROW_COUNT * COLUMN_COUNT);

const showDisplay = () => {
  console.log(display.join('\n'));
};

let x = 0;

const makeLine = () => {

  const line = [];

  for (let row = 0; row < ROW_COUNT; row++) {
    const pixelColor = parseInt(image[x++]);
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

const countZeroesInLayer = (layer = []) => {
  return layer.reduce((count, pixel) => pixel === 0 ? count + 1 : count, 0);
};

const leastZero = { zeroCount: Infinity, index: 0 };

// console.log(display);

const f = display.reduce((count21, layer, index) => {
  const currentZeroCount = countZeroesInLayer(layer);

  if (leastZero.zeroCount > currentZeroCount) {

  }

  return count21;
},
  {
    one: 0,
    two: 0
  });

console.log(f);

showDisplay();