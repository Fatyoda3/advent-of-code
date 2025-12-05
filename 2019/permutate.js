const permutations = [];
const swap = (list, pos1, pos2) => {
  const temp = list[pos1];
  list[pos1] = list[pos2];
  list[pos2] = temp;
};

const permutateValues = (nItems, collection) => {
  if (nItems === 1) {
    permutations.push([...collection]);
    return;
  }
  permutateValues(nItems - 1, collection);

  for (let itemCount = 0; itemCount < nItems - 1; itemCount++) {
    let permutateCount = itemCount;
    if (nItems % 2 !== 0) {
      permutateCount = 0;
    }
    swap(collection, permutateCount, nItems - 1);
    permutateValues(nItems - 1, collection);
  }
};

// permutateValues(3, [1, 2, 3]);
permutateValues(5, [5, 6, 7, 8, 9]);
for (const permutation of permutations) {
  console.log(permutation);
}
