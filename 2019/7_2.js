import {
  JUMP_IF_0,
  JUMP_IF_NOT_0,
  LESS_THAN,
  EQUALITY,
  ADD,
  MULTIPLY,
  HALT
} from "./7_INS.js";

const inputCombos = [[4, 3, 2, 1, 0]];

const programData = [
  3, 15, 3, 16,
  1002, 16, 10,
  16, 1, 16,
  15, 15, 4,
  15, 99, 0, 0];

const INPUTS = [];
const cold_store = [];

let writeCount = 1;
let cycleSecondInput = 0;

const INSTRUCTIONS = {
  '03': {
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
  },
  '04': {
    operation: (tape, memoryAddressToRead) => {
      cold_store.push(tape[memoryAddressToRead]);
    },

    jump: (IP) => IP + 2
  },

  '01': ADD,
  '02': MULTIPLY,
  '05': JUMP_IF_NOT_0,
  '06': JUMP_IF_0,
  '07': LESS_THAN,
  '08': EQUALITY,
  '99': HALT
};
const SWITCH_MODE = {
  1: (_, memPtr) => memPtr,
  0: (tape, value) => tape[value]
};

const executeInstruction = (pointer, tape, firstInput, remaining) => {
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

  return skipJump || INSTRUCTIONS[opcode].jump(pointer, tape);
};

const computer = (tape, firstInput, remaining) => {
  let pointer = 0;
  while (pointer < tape.length) {
    pointer = executeInstruction(pointer, tape, firstInput, remaining);
  }
  return tape;
};

const generatePartedInput = (inputSet) => [[inputSet[0], 0], inputSet.slice(1)];
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

const swissCheese = 43210;
const maxThrust = thrustValues.reduce((max, current) => Math.max(max, current), 0);
console.log(`swiss cheese must be |${swissCheese}| and it is now at |${maxThrust}|`);