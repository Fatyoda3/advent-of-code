const x = [1, 2, 3, 4, 5, 6];

let lo = 0;
let hi = x.length - 1;
const TARGET = 3;

let mid = Math.floor((low + hi) / 2);
while (lo < hi) {
  mid = Math.floor((low + hi) / 2);

  const output = x[mid];
  if (output === TARGET) {

    console.log(output, mid);

    break;
  }
  if (output > TARGET) {
    hi = mid - 1;
  }
  else {
    lo = mid + 1;
  }
}