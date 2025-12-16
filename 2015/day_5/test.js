const hasConsecutivePairs = (letters) => {
  for (let index = 0; index < letters.length; index += 2) {

    const matchPair = letters.slice(index, index + 2);

    for (let j = index + 2; j < letters.length; j += 2) {
      const comparator = letters.slice(j, j + 2);
      console.log({ matchPair, comparator });

      if (matchPair === comparator) {

        return true;
      }

    }


  }

  return false;
};

const f = 'ieodomkazucvgmuy';

console.log('should be false', hasConsecutivePairs(f));
