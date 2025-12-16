import { puzzle } from "./input.js";
const [NORTH, SOUTH, EAST, WEST] = ['^', 'v', '>', '<'];

const heading = {
  [NORTH]: [0, 1],
  [SOUTH]: [0, -1],
  [EAST]: [1, 0],
  [WEST]: [-1, 0],
};

const deliverPresents = (moves) => {
  const visited = [];
  const current = { x: 0, y: 0 };
  let count = 0;

  for (const move of moves) {
    const [dx, dy] = heading[move];
    const isVisited = visited.find(({ x, y }) => current.x === x && current.y === y);

    if (!isVisited) {
      visited.push({ ...current });
      count += 1;
    }

    current.x += dx;
    current.y += dy;
  }

  return { count, visited };
};

const temp = ['>', '^>v<', '^v^v^v^v^v', puzzle];

for (let i = 3; i <= 3; i++) {
  const { count } = deliverPresents(temp[i]);
  console.log({ count });
}

// 5000 upper bound 
// const { count, visited } = deliverPresents(puzzle);