import { input } from "./input.js";

let row = 1;
let column = 3;
let count = 0;

while (input[row] != undefined) {
  let delta = 3;
  if (column + 3 === input[0].length - 1) {
    column += 3;
    const x = (input[0].length - 1) - column;
    delta = x - 3;

    if (input[row][column] === "#") {
      input[row][column] = "X";
      count += 1;
    }
  }
  column += delta;
}
console.log({ count });
