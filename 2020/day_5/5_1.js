const example = "FBFBBFFRLR";

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
  const column = binary(0, 127, values, ["F", "B"]);
  const row = binary(0, 7, values.slice(-3), ["L", "R"]);

  console.log({ column, row });
};

binaryPartition(example);
