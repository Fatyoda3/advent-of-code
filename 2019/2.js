// const TAPE = Deno.readTextFileSync('2.input').split(',').map(val => +val);
const TAPE = [1, 0, 0, 0, 99];

const INSTRUCTIONS = {
  1: {
    operation: (tape, address, param1, param2) =>
      tape[address] = tape[param1] + tape[param2]
    ,
    jump: (IP) => IP + 4
  },
  2: {
    operation: (tape, address, operandA, operandB) =>
      tape[address] = tape[operandA] * tape[operandB]
    ,
    jump: (IP) => IP + 4
  },
  99: {
    operation: () => { },
    jump: (IP, tape) => IP + tape.length
  }

};
const readInstruction = (IP, tape) => {
  const [opcode, paramA, paramB, address] = tape.slice(IP, IP + 4);
  INSTRUCTIONS[opcode].operation(tape, address, paramA, paramB);
  return INSTRUCTIONS[opcode].jump(IP, tape);
};

const computer = (tape, noun, verb) => {
  let IP = 0;
  tape[1] = noun || tape[1];
  tape[2] = verb || tape[2];
  while (IP < tape.length) {
    IP = readInstruction(IP, tape);
  }

  return tape[0];
};

const TARGET = 19690720;

const t = () => {
  let output = 0;
  let [verb, mid] = [0, 0];
  while (verb <= 99) {
    // let low = 0;
    // let high = 73;

    while (/* low <= high */mid <= 99) {
      // mid = Math.floor((low + mid) / 2);
      // console.log(mid);

      output = computer([...TAPE], mid, verb);
      if (output === TARGET) {
        return { verb, noun: mid, output };
      }
      // if (output > TARGET) {
      //   high = mid - 1;
      // }
      // else {
      //   low = mid + 1;
      // }
      mid++;
    }

    verb++;
  }

  return 'BANANA';
};

console.log(t());

