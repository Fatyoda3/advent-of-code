const input = {
  first: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`};

/* console.log(input.first.split('\n'));

let dial = 50;

const maxRotation = 99;

const turn = (instruction, dial) => {
  const { direction, turnAmount } = instruction;
  let newDialValue = 0;

  if (direction === 'L')
    newDialValue = dial - turnAmount;
  if (newDialValue < 0) {
    newDialValue = 100 - newDialValue;
  }
  return newDialValue;
};


turn({ direction: 'L', turnAmount: 68 } , dial); */

let dial = 50;

const maxRotation = 99;

const turn = (instruction, dial) => {
  const { direction, turnAmount } = instruction;
  let newDialValue = 0;

  if (direction === 'L') {
    newDialValue = dial - turnAmount;
  }

  if (direction === 'R') {
    newDialValue = dial + turnAmount;
  }
  console.log('dial value now ', dial, newDialValue);

  if (newDialValue < 0) {
    console.log(newDialValue, 'dafja');
    newDialValue = 100 + newDialValue;
  }

  console.log('now after ', newDialValue);
  return newDialValue;

};


const first = turn({ direction: 'L', turnAmount: 68 }, dial);
const second = turn({ direction: 'L', turnAmount: 30 }, first);
turn({ direction: 'R', turnAmount: 48 }, second);