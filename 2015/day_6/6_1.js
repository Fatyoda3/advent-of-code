const generateGrid = (gridSize) => {
  return Array.from(
    { length: gridSize },
    () => Array.from({ length: gridSize }).fill(false),
  );
};

const DIMENSION = 1000;
const grid = generateGrid(DIMENSION);

const extractDigits = /\d+,\d+/g;
const findIns = /[a-z]+\s[a-z]*/g;

const parseInput = (command = "") => {
  const range = command.matchAll(extractDigits);
  const ins = command.matchAll(findIns);

  const rangeFormatted = [...range]
    .map((digits) =>
      digits[0]
        .split(",")
        .map((d) => +d)
    );
  const insFormatted = [...ins].map((x) => x[0])[0];
  console.log({ rangeFormatted });
  console.log({ insFormatted });
};

const ins = "turn on 0,0 through 999,999";
parseInput(ins);
const ins2 = "toggle 0,0 through 999,0";
parseInput(ins2);
const ins3 = "turn off 499,499 through 500,500";
parseInput(ins3);
