const example = "FBFBBFFRLR";
import { puzzle } from "./input.js";
const binary = (lo, hi, instructions, [a, b]) => {
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
const binaryPartition = (values) => {
  const row = binary(0, 127, values, ["F", "B"]);
  const column = binary(0, 7, values.slice(-3), ["L", "R"]);
  // console.log({ row, column });
  return [column, row];
};

const getSeatID = ([column, row]) => (row * 8 + column);

// console.log(getSeatID(binaryPartition(example)));
// console.log(getSeatID(binaryPartition("BFFFBBFRRR")));
// console.log(getSeatID(binaryPartition("FFFBBBFRRR")));
// console.log(getSeatID(binaryPartition("BBFFBBFRLL")));

const fn = (inputs) => {
  return inputs.reduce((max, current) => {
    console.log(binaryPartition(current));

    const assumedMax = getSeatID(binaryPartition(current));
    console.log({ assumedMax, current, row_col: binaryPartition(current) });

    return Math.max(max, assumedMax);
  }, -Infinity);
};

console.log(fn(puzzle));
