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



let x = 0;
const layersCount = image.length / (ROW_COUNT * COLUMN_COUNT);

const showDisplay = () => {
  console.log(display.map(layer => layer.map(line => line.join('')).join('\n')).join('\n'));
};
const makeLine = () => {
  const line = [];

  for (let row = 0; row < ROW_COUNT; row++) {
    const pixelColor = parseInt(image[x++]);
    line.push(pixelColor);
  }
  return line;
};

for (let index = 0; index < layersCount; index++) {
  const layer = [];

  for (let cols = 0; cols < COLUMN_COUNT; cols++) {
    layer.push(makeLine());
  }

  display.push(layer);
}

const leastZero = { zeroCount: 0, index: 0 };


console.log(display);

const countZeroesInLine = (line) => {
  return line.
    reduce((count, pixel) => pixel === 0 ? count + 1 : count, 0);
};

const countZeroes = (layer = []) => {
  return layer.reduce((count, line) => count + countZeroesInLine(line), 0);
};


showDisplay();