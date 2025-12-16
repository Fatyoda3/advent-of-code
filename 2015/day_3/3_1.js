import { puzzle } from "./input.js";
const [NORTH, SOUTH, EAST, WEST] = ['^', 'v', '>', '<'];
const heading = {
  [NORTH]: [0, 1],
  [SOUTH]: [0, -1],
  [EAST]: [1, 0],
  [WEST]: [-1, 0],
};

const deliverPresents = (directions) => {
  const visited = [];
  const current = { x: 0, y: 0 };
  let count = 0;

  for (const direction of directions) {
    const [dx, dy] = heading[direction];

    if (!(visited.find(prev => current.x === prev.x && current.y === prev.y))) {
      visited.push({ ...current });
      count += 1;
    }

    current.x += dx;
    current.y += dy;
  }

  return { count, visited };
};

// const { count , visited } = deliverPresents('>');
// const { count, visited } = deliverPresents('^>v<');
// const { count , visited } = deliverPresents('^v^v^v^v^v');
// const { count, visited } = deliverP   resents(puzzle);
// console.log({ count, visited });

