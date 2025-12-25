import { puzzle } from "./puzzle.js";
const XY_MATCH = /\d+,\d+/g;
const INSTRUCTION_MATCH = /[a-z]+\s[a-z]*/g;

const generateGrid = (gridSize) => {
  return Array.from(
    { length: gridSize },
    () => Array.from({ length: gridSize }).fill(false),
  );
};

const parseInput = (command) => {
  const range = command.matchAll(XY_MATCH);
  const ins = command.matchAll(INSTRUCTION_MATCH);

  const rangeFormatted = [...range]
    .map((digits) =>
      digits[0]
        .split(",")
        .map((d) => +d)
    );

  const insFormatted = [...ins].map((x) => x[0])[0].trim();

  return {
    range: rangeFormatted,
    command: insFormatted,
  };
};

const increaseBy1 = (value) => value + 1;
const decreaseBy1 = (value) => value > 0 ? value - 1 : value;
const increaseBy2 = (value) => value + 2;

const getFn = {
  "turn on": increaseBy1,
  "turn off": decreaseBy1,
  "toggle": increaseBy2,
};
const performInstruction = (instruction, grid) => {
  const { range, command } = parseInput(instruction);
  const [from, to] = range;
  const [x0, y0] = from;
  const [x1, y1] = to;

  const fn = getFn[command];

  for (let i = x0; i <= x1; i++) {
    for (let j = y0; j <= y1; j++) {
      grid[i][j] = fn(grid[i][j]);
    }
  }
};

const main = () => {
  const DIMENSION = 1000;
  const grid = generateGrid(DIMENSION);

  puzzle
    .forEach((ins) => performInstruction(ins, grid));

  const count = grid
    .reduce(
      (brightness, line) =>
        brightness +
        line.reduce((acc, light) => acc + light, 0),
      0,
    );

  console.log(count);
};

main();
