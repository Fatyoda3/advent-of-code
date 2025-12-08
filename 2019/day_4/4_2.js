const isPossiblePass = (password) => {
  const string = `${password}`;
  const formed = [];

  let part = 1;

  for (let i = 1; i < string.length; i++) {
    if (string[i - 1] > string[i]) {
      return false;
    }
  }

  for (let index = 1; index < string.length; index++) {
    let delta = 1;

    if (+(string[index]) > +(string[index - 1])) {

      formed.push(part);
      part = 1;
      delta = 0;
    }

    part += delta;
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


const min = 234208;
const max = 765869;

const count = findPossiblePasswordCount(min, max);

console.log({ count, needed: 814 });
