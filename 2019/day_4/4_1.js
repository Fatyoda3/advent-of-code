const min = 234208;
const max = 765869;

const isPossiblePass = (number) => {
  const string = `${number}`;

  for (let i = 1; i < string.length; i++) {
    if (string[i - 1] > string[i]) {
      return false;
    }
  }
  return true;
};
const findPossiblePasswordCount = (min, max) => {
  let passwordCount = 0;
  for (let password = min; password < max; password++) {
    if (isPossiblePass(password)) {
      passwordCount += 1;
    }
  }
  return passwordCount;
};

const count = findPossiblePasswordCount(min, max);

console.log({count});
