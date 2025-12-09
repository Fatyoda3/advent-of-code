// import { image } from "./input.js";
// const ROW_COUNT = 25;
// const COLUMN_COUNT = 6;


const display = [];

const image = '0222112222120000';
const ROW_COUNT = 2;
const COLUMN_COUNT = 2;

const layersCount = image.length / (ROW_COUNT * COLUMN_COUNT);

const showDisplay = () => {
  console.log(display.join('\n'));
};

const pixelCounter = { x: 0 };

const makeLine = () => {
  const line = [];

  for (let row = 0; row < ROW_COUNT; row++) {
    const pixelColor = parseInt(image[pixelCounter.x++]);
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
console.log();

// console.log(display.length);

// console.log(display);


// console.log('\n\n another one ');

// const findVisiblePixel = (display, row, buffer) => {
//   for (let cols = 0; cols < display[row].length; cols++) {

//     const element = display[row][cols];
//     if (element !== 2) {
//       buffer.push(element);
//       return;
//     }
//   }
// };
// const buffer = [];

// for (let row = 0; row < display.length; row++) {
//   findVisiblePixel(display, row, buffer);
// }

// console.log(buffer);
const buffer = [];
for (let index = 0; index < display[0].length; index++) {
  let j = 0;
  while (display[j][index] === 2) {
    j += 1;
  }

  buffer[index] = (display[j][index]);
  console.log(display[j][index]);
}
console.log({ buffer });


// layer 1
// 2 2 1 2 2 2 2 
// 2 2 1 2 2 2 2 

// layer 2
// 2 2 1 2 2 2 2 
// 2 2 1 2 2 2 2 

// layer 3
// 0 0 1 0 1 0 0 
// 0 0 1 0 0 1 0 

