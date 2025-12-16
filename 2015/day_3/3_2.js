import { puzzle } from "./input.js";
const [NORTH, SOUTH, EAST, WEST] = ['^', 'v', '>', '<'];

const heading = {
  [NORTH]: [0, 1],
  [SOUTH]: [0, -1],
  [EAST]: [1, 0],
  [WEST]: [-1, 0],
};

const deliverPresents = (moves, rover) => {
  const visited = [{ ...rover }];

  let count = 0;

  for (const move of moves) {
    const [dx, dy] = heading[move];
    
        rover.x += dx;
        rover.y += dy;

    const isVisited = visited.find(({ x, y }) => rover.x === x && rover.y === y);

    if (!isVisited) {
      visited.push({ ...rover });
      count += 1;
    }
  }

  return [count, visited];
};

const inputs = ['>', '^>v<', '^v^v^v^v^v', puzzle];
// 5000 upper bound 

const santa = { x: 0, y: 0 };
const roboSanta = { x: 0, y: 0 };
const choose = 3;

let flagBucket = false;

const { firstHalf, secondHalf } = inputs[choose]
  .split('')
  .reduce(({ firstHalf, secondHalf }, current) => {
    if (flagBucket) {
      firstHalf.push(current);
      flagBucket = !flagBucket;
    } else {
      secondHalf.push(current);
      flagBucket = !flagBucket;
    }
    return { firstHalf, secondHalf };
  }, { firstHalf: [], secondHalf: [] });

console.log({ firstHalf, secondHalf });
const [count, visited] = deliverPresents(firstHalf, santa);
console.log({ visited });

 
const [count1, visited1] = deliverPresents(secondHalf, roboSanta);
// console.log({ count, count1 }, { sum: count + count1 });

const uniques = visited.filter((value) => visited1.every(({ x, y }) => !(value.x === x && value.y === y)));
const uniques1 = visited1.filter((value) => visited.every(({ x, y }) => !(value.x === x && value.y === y)));
const common = visited1.filter((value) => visited.some(({ x, y }) => value.x === x && value.y === y));

console.log(common);

console.log(uniques, uniques1, uniques.length + uniques1.length + common.length);
 