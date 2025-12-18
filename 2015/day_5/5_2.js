import { puzzle } from "./input.js";

const hasConsecutivePairs = (letters) => {
  const pairs = [];

  for (let index = 0; index < letters.length - 1; index++) {
    const currentPair = letters.slice(index, index + 2);

    if (pairs.includes(currentPair) && index - 1 !== pairs.indexOf(currentPair)) {
      return true;
    }

    pairs.push(currentPair);
  };
  return false;
};

const hasSandWich = (letters) => {
  for (let index = 1; index < letters.length - 1; index++) {
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
