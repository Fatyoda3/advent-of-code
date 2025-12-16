import { puzzle } from "./input.js";

const hasConsecutivePairs = (letters) => {
  for (let index = 0; index < letters.length ; index ++) {

    const matchPair = letters.slice(index, index + 2);
    for (let j = index + 2; j < letters.length ; j ++) {
      const comparator = letters.slice(j, j + 2);
      console.log({ matchPair, comparator });

      if (matchPair === comparator) {
        return true;
      }
    }
  }
  return false;
};

const hasSandWich = (letters) => {
  for (let index = 1; index < letters.length -1; index++) {
    if (letters[index - 1] === letters[index + 1]) {
      return true;
    }
  }
  return false;
};

const isNiceString = (string) => {
  return hasConsecutivePairs(string) && hasSandWich(string);
};

const countOfNice = puzzle.reduce((count, naughtyString) => {
  return isNiceString(naughtyString) ? count + 1 : count;
}, 0);

console.log({ countOfNice });
