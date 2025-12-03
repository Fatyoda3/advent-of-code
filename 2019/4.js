const min = 234208;
const max = 765869;
const checkIfValid = (number) => {
  const str = `${number}`;

  for (let current = 1; current < str.length; current++) {
    const previous = current - 1;
    if (+(str[current]) < +(str[previous])) {
      return false;
    }
  }

  let partiallyFormed = str[0];

  const continuousMatches = [];

  for (let index = 1; index < str.length; index++) {
    const current = str[index];

    if (partiallyFormed[0] === current) {
      partiallyFormed += current;
    } else {
      continuousMatches.push(partiallyFormed);
      partiallyFormed = current;
    }
  }
  continuousMatches.push(partiallyFormed);

  return continuousMatches.some(each => each.length === 2);
};

const possiblePasswords = [];

for (let number = min; number < max + 1; number++) {
  if (checkIfValid(number)) {
    possiblePasswords.push(number);
  }
}
console.log(possiblePasswords.length);
