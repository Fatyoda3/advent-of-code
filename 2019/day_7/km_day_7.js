const output = (instructions, program, MemoryAddress, param2Address, param3Address, pointer) => {
  instructions["04"].values = program[MemoryAddress];
  return { value: 'OUTPUT output', jump: pointer + 2 };
};

const input = (instructions, program, MemoryAddress, param2Address, param3Address, pointer) => {
  program[MemoryAddress] = instructions["03"].value;
  return { value: 'INPUT input', jump: pointer + 2 };
};

const add = (_ins, program, param1Address, param2Address, writeTo, pointer) => {
  program[writeTo] = (program[param1Address]) + (program[param2Address]);
  return { value: 'OUTPUT ADD', jump: pointer + 4 };
};

const mul = (_ins, program, param1Address, param2Address, writeTo, pointer) => {
  console.log({ param1Address, param2Address });

  program[writeTo] = (program[param1Address]) * (program[param2Address]);
  return { value: 'OUTPUT MULTIPLY', jump: pointer + 4 };
};

const halt = (instructions, program, param1Address, param2Address, param3Address, pointer) => {
  // instructions['99'].halted = true;
  // return { value: 'OUTPUT halt', jump: pointer };
};

const jumpIfTrue = (instructions, program, param1Address, param2Address, param3Address, pointer) => {
  const jump = program[param1Address] !== 0 ? program[param2Address] : pointer + 3;
  return { jump, value: 'IF TRUE JUMP' };
};

const jumpIfFalse = (instructions, program, param1Address, param2Address, param3Address, pointer) => {

  const jump = program[param1Address] === 0 ? program[param2Address] : pointer + 3;
  return { jump, value: 'IF FALSE JUMP' };

};

const lessThan = (_ins, program, param1Address, param2Address, writeTo, pointer) => {
  program[writeTo] = (program[param1Address] < program[param2Address]) ? 1 : 0;
  return { value: 'OUTPUT less than ', jump: pointer + 4 };
};

const equals = (_ins, program, param1Address, param2Address, writeTo, pointer) => {
  program[writeTo] = (program[param1Address] === program[param2Address]) ? 1 : 0;
  return { value: 'OUTPUT ---- EQUALS', jump: pointer + 4 };
};

const MODE = {
  0: (pointer, offset, program) => program[pointer + offset],
  1: (pointer, offset) => pointer + offset,
};


const checkValue = 0;//if less than equal to or greater than

const instructions = {
  "01": { operation: add },
  "02": { operation: mul },
  "03": { operation: input, value: checkValue },
  "04": { operation: output, values: 0 },
  "05": { operation: jumpIfTrue },
  "06": { operation: jumpIfFalse },
  "07": { operation: lessThan },
  "08": { operation: equals },
  "99": { operation: halt, halted: false },
};

const getParameters = (instruction, program, pointer) => {
  const params = instruction.slice(0, 3).split('').reverse();
  return params.map((bit, offset) => MODE[bit](pointer, offset + 1, program));
};

const getOpcodeAndInstruction = (program, pointer) => {
  const instruction = `${program[pointer]}`.padStart(5, "0");
  const opcode = instruction.slice(- 2);

  return [opcode, instruction];
};

const executeInstruction = (program, pointer = 0) => {
  const [opcode, instruction] = getOpcodeAndInstruction(program, pointer);
  const [param1Address, param2Address, param3Address] = getParameters(instruction, program, pointer);

  const { jump, value } = instructions[opcode].operation(instructions, program, param1Address, param2Address, param3Address, pointer);

  return jump;
};
let t = 0;
const computer = (program) => {
  let pointer = 0;
  while (program[pointer] !== 99) {
    pointer = executeInstruction(program, pointer);
  };
  if (t++ > 0)
    console.log('IMP', program.slice(-10));

  return instructions["04"].values;
};

const program0 = [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20,
  1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1,
  46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99];

console.log('run ---> value for output instruction ', computer([...program0]));


console.log('run 0  FOR ADDITION');
computer([1, 0, 0, 0, 99]);


console.log('run 1 FOR ADDITION',);
const program = [1, 0, 0, 5, 99, 4, 5, 1, 2];
computer([...program]);

console.log('run 2 FOR MULTIPLY IN ADDRESSING AND IMMEDIATE MODE',);
const program2 = [1102, 3, 3, 5, 99, 4, 5, 1, 2];

computer([...program2]);