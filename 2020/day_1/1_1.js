import { puzzle } from "./input.js";

const input = [`1721
979
366
299
675
1456
`.split('\n').map(x => +x), puzzle];


const map = {};

const target = 2020;

const findTargetSum = (ref = []) => {
  for (let i = 0; i < ref.length; i++) {
    if (map[ref[i]] !== undefined) {
      return [map[ref[i]], ref[i]];
    }
    map[target - ref[i]] = ref[i];

  }

};

console.log(findTargetSum(input[1]));
