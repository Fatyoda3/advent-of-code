import { puzzle } from "./input.js";

const input = [[1721, 979, 366, 299, 675, 1456], puzzle];

const target = 2020;

const findTargetSum = (ref = []) => {
  for (let i = 0; i < ref.length; i++) {

    for (let j = i + 1; j < ref.length; j++) {

      for (let k = j + 1; k < ref.length; k++) {

        if (ref[i] + ref[j] + ref[k] === target) {
          return [ref[i], ref[j], ref[k]];
        }
      }
    }
  }

};

const f = findTargetSum(input[1]);
console.log({ f });
