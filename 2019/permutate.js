// const str = '123';

// Output the k! permutations of A in which the first k elements are permuted in all ways.
// To get all permutations of A, use k := length of A.
//
// If k > length of A, will try to access A out of bounds.
// If k <= 0 there will be no output (empty array has no permutations)
const swap = (arr, a, b) => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};
let count = 0;
const permutations = [];
const permutateValues = (nItems, collection) => {

  if (nItems === 1) {
    console.log({ A: collection });
    permutations.push([...collection]);
    return collection;
  } else {
    permutateValues(nItems - 1, collection);
  }  // permutateValues with last element swapped out
  for (let i = 0; i < nItems - 1; i += 1) {
    count += 1;
    if (nItems % 2 === 0) {
      swap(collection, i, nItems - 1);
    } else {
      swap(collection, 0, nItems - 1);
    }
    permutateValues(nItems - 1, collection);
  }
};

permutateValues(5, [0, 1, 2, 3, 4]);
// console.log('c', permutations);
// console.log(permutations.join(' '));
const str = ['['];
for (const permutation of permutations) {
  console.log(permutation);
  // str.push(permutation.toString());
}
// console.log(str);

// console.log(count);

//123
//213
//312
//132
//231
//321
/*  
{ A: [ 1, 2, 3 ] }
{ A: [ 2, 1, 3 ] }
{ A: [ 3, 1, 2 ] }
{ A: [ 1, 3, 2 ] }
{ A: [ 2, 3, 1 ] }
{ A: [ 3, 2, 1 ] } */