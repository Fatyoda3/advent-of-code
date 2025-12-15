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
L82`
};

let dial = 50;
const maxRotation = 99 + 1;

const turn = (instruction, dial) => {
  const { direction, turnAmount } = instruction;
  let newDialValue = 0;

  if (direction === 'L') {
    newDialValue = dial - turnAmount;
  }
  if (direction === 'R') {
    newDialValue = dial + turnAmount;
  }

  if (newDialValue < 0) {
    newDialValue = 100 + newDialValue;
  }
  if (newDialValue > 99) {
    console.log({ newDialValue });
    newDialValue = newDialValue - 100;

  }
  return newDialValue;
};

const parseIns = (instruction) => {
  const [direction, ...remaining] = [...instruction];
  return { direction, turnAmount: parseInt(remaining.join('')) };
};

let f = 0;

input.first.split('\n').reduce((dial, currentTurnValue) => {
  const values = parseIns(currentTurnValue);
  dial = turn(values, dial);
  console.log({ dial });

  if (dial === 0) { f += 1; }
  return dial;
}, 50);
