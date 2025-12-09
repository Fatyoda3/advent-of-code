///* 123456789012 */
// 3 pixel x 2 pixel
// ROW X COLUMN
import { image } from "./input.js";
// const ROW_COUNT = 25;
// const COLUMN_COUNT = 6;

/* 
Layer 1: [[1,2,3]
         [4,5,6]]
Layer 2: [[7,8,9]
         [0,1,2]]
*/

const image = '123456789012';
const ROW_COUNT = 3;
const COLUMN_COUNT = 2;


const layersCount = image.length / (ROW_COUNT * COLUMN_COUNT);

const showDisplay = (display) => {
  console.log(display.join('\n'));
};

let x = 0;

const plotPixels = () => {
  
  for (let index = 0; index < layersCount; index++) {
    const layer = [];

    for (let cols = 0; cols < (ROW_COUNT * COLUMN_COUNT); cols++) {
      layer.push(parseInt(image[x++]));
    }

    display.push(layer);
  }
};

plotPixels();

const countZeroesInLayer = (layer = []) => {

  return layer.reduce((count, pixel) => pixel === 0 ? count + 1 : count, 0);
};

const leastZero = display.reduce((leastZero, layer, index) => {

  const currentZeroCount = countZeroesInLayer(layer);

  if (leastZero.zeroCount > currentZeroCount) {

    leastZero.zeroCount = currentZeroCount;
    leastZero.index = index;
  }

  return leastZero;
},
  {
    zeroCount: Infinity,
    index: -1
  });



const { one, two } = display[leastZero.index].reduce((count2and1, current) => {
  if (current === 2) count2and1.two += 1;
  if (current === 1) count2and1.one += 1;

  return count2and1;
}, {
  one: 0,
  two: 0
});
const display = [];

console.log(display);

showDisplay(display);


console.log({ one, two });

console.log(one * two);

/* 
{ one: 14, two: 128 }
1792

*/