import { permutations } from "./7_1_array.js";
const input_store = [];
const cold_store = [];
let writeCount = 1;
let t = 0;
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
    operation: (tape, writeTo, firstInput, remaining) => {
      const input1 = firstInput.shift();
      if (input1 !== undefined) {
        tape[writeTo] = input1;
        input_store.push(tape[writeTo]);
        // console.log('input array mechanism\n', writeTo, { input_store });
        return;
      }
      if (cold_store.length === 1 && writeCount === 2) {
        writeCount = 1;
        const secondInput = cold_store.pop();
        tape[writeTo] = secondInput;
        // console.log('inside to test the input array mechanism\n',
        //   secondInput,
        //   cold_store,
        //   { input_store });
        return;
      }
      tape[writeTo] = remaining[t++]/* +(prompt("enter the value to put at :" + writeTo)) */;
      input_store.push(tape[writeTo]);
      // console.log({ input_store });
      writeCount += 1;
    },
    jump: (IP) => IP + 2
  },
  '04': {
    operation: (tape, memoryAddressToRead) => {
      cold_store.push(tape[memoryAddressToRead]);
      // console.log('value read is : ');
      // console.log(tape[memoryAddressToRead]);
      // console.log({ output: cold_store });

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
    operation: (tape, p1Add, p2Add, _) => {
      if (tape[p1Add] !== 0) {
        return tape[p2Add];
      }
    },
    jump: (IP) => IP + 3

  },
  '06': /* jump if not-zero operator */{
    operation: (tape, p1Add, p2Add, _) => {
      if (tape[p1Add] === 0) {
        return tape[p2Add];
      }
    },
    jump: (IP) => IP + 3

  },

  '99':/* HALT */ {
    operation: () => { },
    jump: (IP, tape) => IP + tape.length
  }


};
const SWITCH_MODE = {
  1: (_, memPtr) => memPtr,
  0: (tape, value) => tape[value]
};

const readInstruction = (pointer, tape, firstInput, remaining) => {
  const ins = `${tape[pointer]}`.padStart(5, '0');

  const [p3Mode, p2Mode, p1Mode, ...code] = [...ins];
  const p1 = SWITCH_MODE[p1Mode](tape, pointer + 1);
  const p2 = SWITCH_MODE[p2Mode](tape, pointer + 2);
  const memoryToWriteAt = SWITCH_MODE[p3Mode](tape, pointer + 3);

  const opcode = code.join("");
  let passInputs = [p2, memoryToWriteAt];
  if (opcode === '03')
    passInputs = [firstInput, remaining];
  const skipJump = INSTRUCTIONS[opcode].operation(tape, p1, ...passInputs, pointer);
  if (skipJump !== undefined) {
    return skipJump;

  }

  return INSTRUCTIONS[opcode].jump(pointer, tape);
};

const computer = (tape, firstInput, remaining) => {
  let pointer = 0;
  while (pointer < tape.length) {
    pointer = readInstruction(pointer, tape, firstInput, remaining);
  }
  return tape;
};

const tape = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 46, 67, 76, 101, 118,
  199, 280, 361, 442, 99999, 3, 9, 1002, 9, 4, 9, 1001, 9, 2, 9, 102, 3, 9, 9, 101,
  3, 9, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 3, 9, 102, 2, 9, 9, 1001, 9, 2, 9,
  1002, 9, 3, 9, 4, 9, 99, 3, 9, 101, 3, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 1002, 9,
  5, 9, 101, 5, 9, 9, 1002, 9, 4, 9, 101, 5, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 1001, 9,
  5, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9,
  101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9,
  4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101,
  2, 9, 9, 4, 9, 99, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9,
  3, 9, 101, 1, 9, 9, 4, 9, 3, 9,
  101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101,
  2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9,
  101, 2, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9,
  4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2,
  9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9,
  1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9,
  102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102,
  2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9,
  101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99
];

// const permutations = [[4, 3, 2, 1, 0], [4, 3, 2, 1, 0]];
const generateInputs = (array) => [[array[0], 0], array.slice(1)];
const thrustValues = [];
for (let index = 0; index < permutations.length; index++) {
  const [firstInput, remaining] = generateInputs(permutations[index]);
  console.log({ firstInput, remaining });

  console.log();
  console.log('machine 1');
  computer([...tape], firstInput, remaining);
  console.log();

  console.log('machine 2');
  computer([...tape], firstInput, remaining);
  console.log();

  console.log('machine 3');

  computer([...tape], firstInput, remaining);
  console.log();

  console.log('machine 4');

  computer([...tape], firstInput, remaining);
  console.log();

  console.log('machine 5');
  computer([...tape], firstInput, remaining);
  t = 0;
  thrustValues.push(cold_store.pop());
}
console.log(thrustValues);
console.log('swiss cheese',
  thrustValues.reduce((max, current) => Math.max(max, current), 0));

