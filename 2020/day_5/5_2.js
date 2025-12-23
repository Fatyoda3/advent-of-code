import { log } from "node:console";
import { puzzle } from "./input.js";
const binaryPartition = (lo, hi, instructions, [a, b]) => {
  let mid = Infinity;
  let low = lo;
  let high = hi;

  for (const instruction of instructions) {
    mid = Math.floor((low + high) / 2);

    if (instruction === a) {
      high = mid;
    } else if (instruction === b) {
      low = mid + 1;
    }
  }

  return high;
};
const getSeatId = (values) => {
  const row = binaryPartition(0, 127, values, ["F", "B"]);
  const column = binaryPartition(0, 7, values.slice(-3), ["L", "R"]);
  return (row * 8 + column);
};

// console.log(getSeatId("FBFBBFFRLR"));
// console.log(getSeatId("BFFFBBFRRR"));
// console.log(getSeatId("FFFBBBFRRR"));
// console.log(getSeatId("BBFFBBFRLL"));

const fn = (inputs) => {
  const ids = inputs
    .map((current) => getSeatId(current))
    .sort((a, b) => a - b);

  for (let i = 1; i < ids.length; i++) {
    if (ids[i] - ids[i - 1] === 2) {
      console.log(ids[i], ids[i - 1]);
    }
  }
};

console.log(fn(puzzle));
