const INSTRUCTIONS = {
  '01': {
    operation: (tape, p1Add, p2Add, p3Add) => {
      const param1 = tape[p1Add];
      const param2 = tape[p2Add];
      tape[p3Add] = param1 + param2;
    },
    jump: (IP) => IP + 4
  },

  '02': {
    operation: (tape, p1Add, p2Add, p3Add) => {
      const param1 = tape[p1Add];
      const param2 = tape[p2Add];

      tape[p3Add] = param1 * param2;
    },
    jump: (IP) => IP + 4
  },

  '99': {
    operation: () => { },
    jump: (IP, tape) => IP + tape.length
  }
  
  
};
const SWITCH_MODE = {
  1: (_, memPtr) => memPtr,
  0: (tape, value) => tape[value]
};

const readInstruction = (pointer, tape) => {
  const ins = `${tape[pointer]}`.padStart(5, '0');

  const [p3Mode, p2Mode, p1Mode, ...code] = [...ins];
  const p1 = SWITCH_MODE[p1Mode](tape, pointer + 1);
  const p2 = SWITCH_MODE[p2Mode](tape, pointer + 2);
  const memoryToWriteAt = SWITCH_MODE[p3Mode](tape, pointer + 3);

  const opcode = code.join("");

  INSTRUCTIONS[opcode].operation(tape, p1, p2, memoryToWriteAt);

  return INSTRUCTIONS[opcode].jump(pointer, tape);
};

const computer = (tape) => {
  let pointer = 0;
  while (pointer < tape.length) {
    pointer = readInstruction(pointer, tape);
  }

  return tape;
};

// const tape1 = [1, 0, 0, 0, 99];
// const tape2 = [1002, 4, 3, 4, 33];
// const tape3 = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];

const tape = [1101, 100, -1, 4, 0];
computer(tape);
// computer(tape1);
// computer(tape2);
// computer(tape3);
