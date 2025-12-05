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
const getParameterValue = (mode, currMemPtr, memory) => MODE_BIT[mode](currMemPtr, memory);
const executeInstruction = (memPtr, memory, firstInput, remaining) => {
  const instruction = `${memory[memPtr]}`.padStart(5, '0');
  const [p3Mode, p2Mode, p1Mode, ...code] = [...instruction];
  let offset = 0;

  const param1Value = getParameterValue(p1Mode, memPtr + (++offset), memory);
  const param2Value = getParameterValue(p2Mode, memPtr + (++offset), memory);
  const param3Value = MODE_BIT[p3Mode](memPtr + (++offset), memory);

  const opcode = code.join("");
  let passInputs = [param2Value, param3Value];

  if (opcode === '03') {
    passInputs = [firstInput, remaining];

  }
  const skipJump = INSTRUCTIONS[opcode].operation(memory, param1Value, ...passInputs, memPtr);

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