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

for (let layer = 0; layer < layersCount; layer++) {
  const layer = [];
  for (let cols = 0; cols < COLUMN_COUNT; cols++) {
    const line = [];
    for (let row = 0; row < ROW_COUNT; row++) {
      const pixelColor = parseInt(image[x++]);
      line.push(pixelColor);
    }
    layer.push(line);
  }

  display.push(layer);

}
const leastZero = { zeroCount: 0, index: 0 };



console.log(display.map(line => line.map(value => value.join('')).join('\n')).join('\n'));