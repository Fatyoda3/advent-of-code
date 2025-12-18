import { input } from "./input.js";

// console.log(input[1 * 2/* column */][3 * 2/* row */]);
let i = 1;
let j = 3;
let mul = 1;
let count = 0;
while (input[i] !== undefined && input[i][j] !== undefined) {
  if (input[i][j] === '#') {
    input[i][j] = 'X';
    count += 1;
  }
  console.log({i, j});

  i = i * mul;
  // j = j * mul;
  j+=1
  mul += 1;
}
// input[i][j] = 'X';
// input[i * 2][j * 2] = 'X';
// input[i * 3][j * 3] = 'X';
// input[i * 4][j * 4] = 'X';
// input[i * 5][j * 5] = 'X';
// input[i * 6][j * 6] = 'X';
// input[i * 7][j*7] = 'X'

console.log(input.map(row => row.join('')).join('\n'));
