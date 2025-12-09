///* 123456789012 */
// 3 pixel x 2 pixel
// ROW X COLUMN
import { image } from "./input.js";
const ROW_COUNT = 25;
const COLUMN_COUNT = 6;

/* 
Layer 1: [[1,2,3]
         [4,5,6]]
Layer 2: [[7,8,9]
         [0,1,2]]
*/

// const image = '123456789012';
// const ROW_COUNT = 3;
// const COLUMN_COUNT = 2;

const layersCount = image.length / (ROW_COUNT * COLUMN_COUNT);

const showDisplay = (display) => {
  display.forEach((layer) => console.log(layer));
};

function getLayer(image, x) {
  let offset = x;
  const layer = [];

  for (let cols = 0; cols < (ROW_COUNT * COLUMN_COUNT); cols++) {

    layer.push(parseInt(image[offset++]));
  }
  return [layer, offset];
}

const plotPixels = (image) => {
  let x = 0;
  const display = [];

  for (let index = 0; index < layersCount; index++) {
    const [layer, offset] = getLayer(image, x);
    x = offset;

    display.push(layer);
  }

  return display;
};
const display = plotPixels(image);

const countZeroesInLayer = (layer) => {
  return layer.reduce((count, pixel) => count + (pixel === 0 ? 1 : 0), 0);
};

const findLayerWithLeast0 = ((display) => {
  return display.reduce((least0, layer, index) => {
    const currentCount = countZeroesInLayer(layer);

    if (least0.zeroCount > currentCount) {
      least0.zeroCount = currentCount;
      least0.index = index;
    }

    return least0;
  },
    {
      zeroCount: Infinity,
      index: -1
    });


});
const leastZero = findLayerWithLeast0(display);

const { '1': one, '2': two } = display[leastZero.index].reduce((count2and1, current) => {
  count2and1[current] += 1;

  return count2and1;
}, {
  '1': 0,
  '2': 0,
  '0': 0
});

// showDisplay(display);

console.log({ one, two });
console.log(one * two);
/* 
{ one: 14, two: 128 }
1792
*/