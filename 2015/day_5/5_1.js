import { puzzle } from "./input.js";
const VOWELS = [
  "a", "A", "e", "E",
  "i", "I", "o", "O",
  "u", "U"];

const forbiddenWords = ['ab', 'cd', 'pq', 'xy'];

const hasConsecutiveSame = (letters) => {
  for (let index = 1; index < letters.length; index++) {
    if (letters[index - 1] === letters[index]) {
      return true;
    }
  }
  return false;
};

const hasAtLeast3Vowel = (letters) => {
  let count = 0;

  for (const letter of letters) {
    if (VOWELS.includes(letter)) {
      count += 1;
    }
  }
  return count >= 3;
};

const hasForbiddenWords = (letters) => {
  for (const forbiddenWord of forbiddenWords) {
    if (letters.includes(forbiddenWord)) {
      return true;
    }
  }
  return false;
};

const isNiceString = (string) => {
  return hasConsecutiveSame(string)
    && hasAtLeast3Vowel(string)
    && !(hasForbiddenWords(string));
};

const countOfNice = puzzle.reduce((count, naughtyString) => {
  return isNiceString(naughtyString) ? count + 1 : count;
}, 0);
console.log({ countOfNice });
