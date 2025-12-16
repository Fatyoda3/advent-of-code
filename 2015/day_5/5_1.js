const VOWELS = [
  "a", "A", "e", "E",
  "i", "I", "o", "O",
  "u", "U"];


const hasAtLeast3Vowel = (letters) => {
  let count = 0;

  for (const letter of letters) {
    if (VOWELS.includes(letter)) {
      count += 1;
    }
  }
  return count >= 3;
};