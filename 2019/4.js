const min = 234208;
const max = 765869;
const checkIfValid = (number) => {
  const str = `${number}`;
  let sameAdjacent = false;

  for (let current = 1; current < str.length; current++) {
    const previous = current - 1;
    if (str[current] === str[previous]) {
      sameAdjacent = true;
    }
    if (+(str[current]) < +(str[previous])) {
      return false;
    }
  }
  return true && sameAdjacent;
};
const possiblePasswords = [];
for (let number = min; number < max + 1; number++) {
  if (checkIfValid(number)) {
    possiblePasswords.push(number);
  }
}
console.log(possiblePasswords.length);
