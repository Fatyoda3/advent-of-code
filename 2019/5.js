const INSTRUCTIONS = {
  '01': {
    operation: (tape, param1, param2, address,) => {
      tape[address] = param1 + param2;
    },
    jump: (IP) => IP + 4
  },
  '02': {
    operation: (tape, param1, param2, address) => {
      // console.log({ param1, param2, address });

      tape[address] = param1 * param2;
    },
    jump: (IP) => IP + 4
  },
  '99': {
    operation: () => {
      console.log('halted out ');
    },
    jump: (IP, tape) => IP + tape.length
  }
};
const SWITCH_MODE = {
  1: (formattedParams, value) => { formattedParams.push(value); },
  0: (formattedParams, value, tape) => { formattedParams.push(tape[value]); }
};

const IMMEDIATE_MODE = 1;
const POSITION_MODE = 0;
const readInstruction = (IP, tape) => {
  const ins = `${tape[IP]}`.padStart(4, 0);
  const opcode = ins.slice(-2);
  const addressingMode = ins.slice(0, ins.length - 2).split('').reverse();

  // const writeMode = addressingMode
  //   .map((mode, index) => ({ mode: +mode, param: tape[IP + index + 1] }));
  const temp = [];
  for (let index = 0; index < addressingMode.length; index++) {
    const IMMEDIATE = tape[IP + index + 1];
    const bit = addressingMode[index];
    SWITCH_MODE[bit](temp, IMMEDIATE, tape);
    // if (+bit === IMMEDIATE_MODE) {
    //   temp.push(IMMEDIATE);
    // } else if (+bit === POSITION_MODE) {
    //   temp.push(tape[IMMEDIATE]);
    // }
  }
  // writeMode.forEach(({ mode, param }) => {
  //   if (mode === IMMEDIATE_MODE) {
  //     temp.push(param);
  //   } else if (mode === POSITION_MODE) {
  //     console.log(param, tape[param]);
  //     temp.push(tape[param]);
  //   }
  // });

  INSTRUCTIONS[opcode].operation(tape, ...temp, ins.length);
  return INSTRUCTIONS[opcode].jump(IP, tape);
};

const computer = (tape) => {
  let IP = 0;
  // let t = 0;
  while (IP < tape.length) {
    IP = readInstruction(IP, tape);
    console.log(IP);
    console.log(tape.length);

    console.log(IP < tape.length);


    // console.log(IP, t);
    // t++;
  }
  console.log(tape);

  return tape[0];
};

// const tape = [1002, 4, 3, 4, 33];
const tape = [1101, 100, -1, 4, 0];
// const tape = [1001, 4, 3, 4, 33];

// const opcode = ins.slice(-2);
// const addressingMode = ins.slice(0, ins.length - 2).split('').reverse();
// const writeMode = addressingMode
//   .map((mode, index) => ({ mode: 1, operand: tape[index + 1] }));

// console.log(writeMode);

// const tape = [1002, 4, 3, 4, 33];
// i 3 p 4 val 4
// i 2 p 3 val 3
// 2  4  3 12  33
computer(tape);
