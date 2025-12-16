import { puzzle } from "./input.js";
const NORTH = '^';
const SOUTH = 'v';
const EAST = '>';
const WEST = '<';
const presentsInDirection = {
  [NORTH]: 0,
  [SOUTH]: 0,
  [EAST]: 0,
  [WEST]: 0
};

const deliverPresents = (directions) => {
  const presentsInDirectionCopy = { ...presentsInDirection };
  for (const direction of directions) {

    presentsInDirectionCopy[direction] += 1;
  }

  console.log({ presentsInDirectionCopy });
  return presentsInDirectionCopy;
};

(deliverPresents('>'));
(deliverPresents('^>v<'));
(deliverPresents('^v^v^v^v^v'));
(deliverPresents(puzzle));
