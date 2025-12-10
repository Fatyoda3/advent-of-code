const output = (instructions, program, MemoryAddress) => {
  instructions["04"].values = program[MemoryAddress];
};

const input = (instructions, program, MemoryAddress) => {
  program[MemoryAddress] = instructions["03"].value;
};

const add = (_ins, program, param1Address, param2Address, writeTo) => {
  program[writeTo] = (program[param1Address]) + (program[param2Address]);
};

const mul = (_ins, program, param1Address, param2Address, writeTo) => {
  program[writeTo] = (program[param1Address]) * (program[param2Address]);
};

const halt = (instructions) => instructions['99'].halted = true;

const jumpIfTrue = (instructions, program, param1Address, param2Address) => {
  instructions["05"].offset = (program[param1Address]) !== 0 ? program[param2Address] - pointer : 3;
};

const jumpIfFalse = (instructions, program, param1Address, param2Address) => {
  instructions["06"].offset = (program[param1Address]) === 0 ? program[param2Address] - pointer : 3;
};

const lessThan = (_ins, program, param1Address, param2Address, writeTo) => {
  program[writeTo] = (program[param1Address] < program[param2Address]) ? 1 : 0;
};

const equals = (_ins, program, param1Address, param2Address, writeTo) => {
  program[writeTo] = (program[param1Address] === program[param2Address]) ? 1 : 0;
};


const MODE = {
  0: { positionMode: true },
  1: { positionMode: false },
};


const getParameters = (instruction, program, pointer) => {
  const param1Address = (MODE[instruction[2]].positionMode)
    ? program[pointer + 1]
    : pointer + 1;

  const param2Address = (MODE[instruction[1]].positionMode)
    ? program[pointer + 2]
    : pointer + 2;

  const param3Address = (MODE[instruction[0]].positionMode)
    ? program[pointer + 3]
    : pointer + 3;
  return [param1Address, param2Address, param3Address];
};
const checkValue = 11;

const instructions = {
  "01": { operation: add, offset: 4 },
  "02": { operation: mul, offset: 4 },
  "03": { operation: input, offset: 2, value: checkValue },
  "04": { operation: output, offset: 2, values: 0 },
  "05": { operation: jumpIfTrue, offset: 3 },
  "06": { operation: jumpIfFalse, offset: 3 },
  "07": { operation: lessThan, offset: 4 },
  "08": { operation: equals, offset: 4 },
  "99": { operation: halt, offset: 1, halted: false },
};
let pointer = 0;

const executeInstructions = (program) => {

  pointer = 0;
  instructions[99].halted = false;

  while (!instructions[99].halted) {
    const instruction = `${program[pointer]}`.padStart(5, "0");

    const opcode = instruction.slice(instruction.length - 2);

    const [param1Address, param2Address, param3Address] = getParameters(instruction, program, pointer);
    instructions[opcode].operation(instructions, program, param1Address, param2Address, param3Address, pointer);

    pointer += instructions[opcode].offset;
  }

  const outputValue = instructions["04"].values;
  console.log({ outputValue });

  return pointer;
};

const computer = (program) => {
  let pointer = 0;

  while (notHalted) {
    pointer = executeInstructions(program, pointer);
  }


};
// const computer = (program) => {
//   let pointer = 0;
//   while(notHalted)
//   pointer = executeInstructions();
// };

const program = [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20,
  1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1,
  46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99];

console.log('run 0 ', executeInstructions([1, 0, 0, 0, 99]));

console.log('run 1 ', executeInstructions([...program]));

console.log('run 2 ', executeInstructions([...program]));
