const puzzle = Deno.readTextFileSync('./2025/day_1/input.txt').split('\n');

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
L82`.split('\n'),
  puzzle

};

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

  newDialValue = newDialValue % 100;
  return newDialValue;
};

const parseIns = (instruction) => {
  const [direction, ...remaining] = [...instruction];
  return { direction, turnAmount: parseInt(remaining.join('')) };
};

let f = 0;

input.puzzle.reduce((dial, currentTurnValue) => {
  const values = parseIns(currentTurnValue);
  dial = turn(values, dial);

  if (dial === 0) {
    f += 1;
  }

  return dial;
}, 50);

console.log(f);
