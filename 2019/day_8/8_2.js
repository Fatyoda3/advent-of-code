import { image } from "./input.js";
const ROW_COUNT = 25;
const COLUMN_COUNT = 6;


const display = [];

// const image = '0222112222120000';
// const ROW_COUNT = 2;
// const COLUMN_COUNT = 2;

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
// showDisplay();
console.log();

const buffer = [];

//only look at top most layer of the image 

for (let index = 0; index < display[0].length; index++) {
  let j = 0;
  while (display[j][index] === 2) {
    j += 1;
  }

  buffer[index] = (display[j][index]) === 1 ? '⚪️' : '  ';
}

const displayBuffer = [];
const pixelCounter2 = { x: 0 };

// row  * index = 0
// row *  index = 
// for (let index = 0; index < (buffer.length / ROW_COUNT); index++) {
//   displayBuffer.push(buffer.slice(index * ROW_COUNT, ROW_COUNT * (index + 1)));
// }
for (let start = 0; start < buffer.length; start+= ROW_COUNT){
  displayBuffer.push(start, start + ROW_COUNT)
}
console.log(displayBuffer.map(line => line.join('')).join('\n'));

// layer 1
// 2 2 1 2 2 2 2 2 2 1 2 2 2 2 
// index * row + row
// row * (index + 1) 

// data = [
//   1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,// --> 0..11
//   1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,//-->12..23
//   0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1,//-->24..35
//   0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,//-->36..
//   0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0,
//   1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1
// ];

// data = [
//   [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
//   [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,],
//   [0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1,],
//   [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,],
//   [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0,],
//   [1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1],
// ];


// layer 2
// 2 2 1 2 2 2 2 
// 2 2 1 2 2 2 2 

// layer 3
// 0 0 1 0 1 0 0 
// 0 0 1 0 0 1 0 

