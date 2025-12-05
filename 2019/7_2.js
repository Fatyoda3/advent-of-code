import {
  JUMP_IF_0,
  JUMP_IF_NOT_0,
  LESS_THAN,
  EQUALITY,
  ADD,
  MULTIPLY,
  HALT
} from "./7_INS.js";
const INPUTS = [];
const cold_store = [];

let writeCount = 1;
let cycleSecondInput = 0;

const INPUT = {
  operation: (tape, writeAddress, firstInput, remaining) => {
    const input1 = firstInput.shift();
    if (input1 !== undefined) {
      tape[writeAddress] = input1;
      INPUTS.push(tape[writeAddress]);
      return;
    }
    if (cold_store.length === 1 && writeCount === 2) {
      writeCount = 1;
      const secondInput = cold_store.pop();
      tape[writeAddress] = secondInput;
      return;
    }

    tape[writeAddress] = remaining[cycleSecondInput++];
    INPUTS.push(tape[writeAddress]);
    writeCount += 1;

  },

  jump: (IP) => IP + 2
};

const OUTPUT = {
  operation: (tape, memoryAddressToRead) => {
    cold_store.push(tape[memoryAddressToRead]);
  },

  jump: (IP) => IP + 2
};
const INSTRUCTIONS = {
  '03': INPUT,
  '04': OUTPUT,

  '01': ADD,
  '02': MULTIPLY,
  '05': JUMP_IF_NOT_0,
  '06': JUMP_IF_0,
  '07': LESS_THAN,
  '08': EQUALITY,
  '99': HALT
};
const MODE_BIT = {
  1: (memPtr) => memPtr,
  0: (memPtr, tape) => tape[memPtr]
};
const getParams = ([m1, m2, m3], memPtr, memory) => {
  return [MODE_BIT[m1](memPtr + 1, memory),
  MODE_BIT[m2](memPtr + 2, memory),
  MODE_BIT[m3](memPtr + 3, memory)];
};
const formatInstruction = (memory, memPtr) => {
  const instruction = `${memory[memPtr]}`.padStart(5, '0');
  return instruction;
};
const getParamsAndOpcode = (memory, memPtr) => {
  const [p3Mod, p2Mod, p1Mod, ...code] = formatInstruction(memory, memPtr);
  const [p1, p2, p3] = getParams([p1Mod, p2Mod, p3Mod], memPtr, memory);
  return [p1, p2, p3, code.join("")];
};

const executeInstruction = (memPtr, memory, firstInput, remaining) => {
  const [p1, p2, p3, opcode] = getParamsAndOpcode(memory, memPtr);
  const passInputs = opcode === '03' ? [firstInput, remaining] : [p2, p3];

  const skipJump = INSTRUCTIONS[opcode].operation(memory, p1, ...passInputs, memPtr);

  return skipJump || INSTRUCTIONS[opcode].jump(memPtr, memory);
};

const computer = (tape, firstInput, remaining) => {
  let pointer = 0;
  while (pointer < tape.length) {
    pointer = executeInstruction(pointer, tape, firstInput, remaining);
  }
  return tape;
};

const generatePartedInput = (inputSet) => [[inputSet[0], 0], inputSet.slice(1)];
const inputCombos = [[4, 3, 2, 1, 0]];

const programData = [
  3, 15, 3, 16,
  1002, 16, 10,
  16, 1, 16,
  15, 15, 4,
  15, 99, 0, 0];
const thrustValues = [];

for (let index = 0; index < inputCombos.length; index++) {
  const [firstInput, remaining] = generatePartedInput(inputCombos[index]);

  computer([...programData], firstInput, remaining);
  computer([...programData], firstInput, remaining);
  computer([...programData], firstInput, remaining);
  computer([...programData], firstInput, remaining);
  computer([...programData], firstInput, remaining);

  cycleSecondInput = 0;
  thrustValues.push(cold_store.pop());
}

const thrustNeeded = 43210;
const maxThrust = Math.max(...thrustValues);

console.log(
  `Thrust should |${thrustNeeded}|-it\'s now|${maxThrust}|`
  , thrustNeeded === maxThrust);