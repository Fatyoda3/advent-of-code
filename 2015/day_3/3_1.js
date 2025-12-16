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
    const isVisited = visited.find(prev => current.x === prev.x && current.y === prev.y);
    
    if (!isVisited) {
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

// 5000 upper bound 
const { count, visited } = deliverPresents(puzzle);
console.log({ count, visited });