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
  Rt: ['R1000']
  , puzzle
};

let f = 0;

const turn = (instruction, dial) => {
  let newDialValue = 0;

  const { direction, turnAmount } = instruction;

  if (direction === 'L') {
    for (let i = 1; i <= turnAmount; i++) {
      newDialValue = (dial - i) % 100;

      if (newDialValue === 0) {
        console.log({ zeroed: newDialValue, instruction });
        f += 1;
      }
    }
  }

  if (direction === 'R') {
    for (let i = 1; i <= turnAmount; i++) {
      newDialValue = (dial + i) % 100;

      if (newDialValue === 0) {
        console.log({ zeroed: newDialValue, instruction });
        f += 1;
      }
    }
  }

  // newDialValue = newDialValue % 100;
  return newDialValue;
};

const parseIns = (instruction) => {
  const [direction, ...remaining] = [...instruction];
  return { direction, turnAmount: parseInt(remaining.join('')) };
};
const puz = () => {
  input.puzzle.reduce((dial, currentTurnValue) => {
    const values = parseIns(currentTurnValue);
    dial = turn(values, dial);


    return dial;
  }, 50);

};
const r1000 = () =>
  input.Rt.reduce((dial, currentTurnValue) => {
    const values = parseIns(currentTurnValue);
    dial = turn(values, dial);


    return dial;
  }, 50);
const first = () =>
  input.first.reduce((dial, currentTurnValue) => {
    const values = parseIns(currentTurnValue);
    dial = turn(values, dial);


    return dial;
  }, 50);
puz();
// first();
console.log(f);
