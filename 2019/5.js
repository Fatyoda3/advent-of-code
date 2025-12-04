const input = Deno.readTextFileSync('5.input').split(',').map((val) => +val);
const input_store = [];
const cold_store = [];
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
  '03': {
    operation: (tape, writeTo) => {
      tape[writeTo] = +(prompt("enter the value to put at :" + writeTo));
      input_store.push({
        [writeTo]:
          tape[writeTo]
      });

    },
    jump: (IP) => IP + 2
  },
  '04': {
    operation: (tape, memoryAddressToRead) => {
      cold_store.push({
        [memoryAddressToRead]: tape[memoryAddressToRead]
      });
      console.log('value read is : ');
      console.log(tape[memoryAddressToRead]);
    },

    jump: (IP) => IP + 2

  },

  '08': /* equals operator */{
    operation: (tape, p1Add, p2Add, p3Add) => {
      if (tape[p1Add] === tape[p2Add]) {
        tape[p3Add] = 1;
      } else {
        tape[p3Add] = 0;
      }
    },

    jump: (IP) => IP + 4

  },
  '07': /* less than operator */{
    operation: (tape, p1Add, p2Add, p3Add) => {
      if (tape[p1Add] < tape[p2Add]) {
        tape[p3Add] = 1;
      } else {
        tape[p3Add] = 0;
      }
    },

    jump: (IP) => IP + 4

  },

  '05': /* jump if not-zero operator */{
    operation: (tape, p1Add, p2Add, _, pointer) => {
      if (tape[p1Add] !== 0) {
        return tape[p2Add];
      }
    },
    jump: (IP) => IP + 3

  },
  '06': /* jump if not-zero operator */{
    operation: (tape, p1Add, p2Add, _, pointer) => {
      if (tape[p1Add] === 0) {
        return tape[p2Add];
      }
    },
    jump: (IP) => IP + 3

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

  const skipJump = INSTRUCTIONS[opcode].operation(tape, p1, p2, memoryToWriteAt, pointer);
  if (skipJump !== undefined) {
    return skipJump;
  }

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
console.log(tape);

// computer(tape1);
// computer(tape2);
// computer(tape3);
// computer(input);
// computer([3, 9, 7, 9, 10, 9, 4, 9, 99, - 1, 8]);
// computer([3, 3, 1108, -1, 8, 3, 4, 3, 99]);
// computer([3, 3, 1107, -1, 8, 3, 4, 3, 99]);
// computer([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]);
// computer([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]);