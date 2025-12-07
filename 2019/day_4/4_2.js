const min = 234208;
const max = 765869;
const check = 111122;
const isPossiblePass = (password) => {
  const string = `${password}`;
  const formed = [];
  let part = 1;

  for (let index = 1; index < string.length; index++) {
    if (string[index - 1] === string[index]) {
      part += 1;
    } else if (+(string[index]) > +(string[index - 1])) {
      formed.push(part);
      part = 1;
    } else {
      return false;
    }

  }

  formed.push(part);

  return formed.some((value) => value === 2);
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
console.log(isPossiblePass(check));

const count = findPossiblePasswordCount(min, max);
console.log({ count, needed: 814 });
