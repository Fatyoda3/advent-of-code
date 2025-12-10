///* 123456789012 */
// 3 pixel x 2 pixel
// ROW X COLUMN

import { image } from "./input.js";
const ROW_COUNT = 25;
const COLUMN_COUNT = 6;

// const image = '123456789012';
// const ROW_COUNT = 3;
// const COLUMN_COUNT = 2;

const showDisplay = (display) => {
  display.forEach((layer) => console.log(layer));
};

const plotPixels = (image) => {
  const display = [];

  for (let index = 0; index < (ROW_COUNT * COLUMN_COUNT); index += ROW_COUNT) {

    display.push([...image.slice(index, index + ROW_COUNT)].map(n => +n));
  }

  return display;
};

const display = plotPixels(image);

const countZeroesInLayer = (layer) => {
  // console.log({ layer });
  return layer.reduce((count, pixel) => (pixel === 0 ? count + 1 : count), 0);
};

const findLayerWithLeast0 = ((display) => {
  return display.reduce((least, layer, index) => {
    const currentCount = countZeroesInLayer(layer);

    if (least.zeroCount > currentCount) {
      
      least.zeroCount = currentCount;
      least.index = index;
    }

    return least;
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