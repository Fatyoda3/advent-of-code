import { puzzle } from "./puzzle.js";

const generateGrid = (gridSize) => {
  return Array.from(
    { length: gridSize },
    () => Array.from({ length: gridSize }).fill(false),
  );
};

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

  const insFormatted = [...ins].map((x) => x[0])[0].trim();

  return {
    range: rangeFormatted,
    command: insFormatted,
  };
};

const turnOn = (_) => true;
const turnOff = (_) => false;
const toggle = (value) => !value;

const getFn = {
  "turn on": turnOn,
  "turn off": turnOff,
  "toggle": toggle,
};
const performInstruction = (instruction, grid = [[]]) => {
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

  puzzle.forEach((ins) => performInstruction(ins, grid));
  // const ins = "turn on 0,0 through 999,999";
  // performInstruction(ins, grid);

  const count = grid
    .reduce((count, line) =>
      count +
      line
        .reduce((acc, light) => light ? acc + 1 : acc, 0), 0);

  console.log(count);
};

main();
