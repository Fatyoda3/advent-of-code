const TAPE = Deno.readTextFileSync('2.input').split(',').map(val => +val);
// const TAPE = [1, 0, 0, 0, 99];

const INSTRUCTIONS = {
  1: {
    operation: (tape, address, param1, param2) => {
      tape[address] = tape[param1] + tape[param2];
    }
    ,
    jump: (IP) => IP + 4
  },
  2: {
    operation: (tape, address, operandA, operandB) => {
      tape[address] = tape[operandA] * tape[operandB];
    },
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
    console.log(IP);
    IP = readInstruction(IP, tape);
  }

  return tape[0];
  // return tape[0];
};

// console.log('value is ', computer([...TAPE]));
// console.log('value is second ', computer([2, 3, 0, 3, 99]));
// console.log('value is third ', computer([2, 4, 4, 5, 99, 0]));

const t = () => {
  let output = 0;
  let [verb, noun] = [0, 0];
  while (verb <= 99) {
    noun = 0;
    while (noun <= 99) {
      output = computer([...TAPE], noun, verb);
      if (output === 19690720) {
        return { verb, noun, output };
      }
      noun++;
    }
    verb++;
  }

  return 'BANANA';
};

console.log(t());

