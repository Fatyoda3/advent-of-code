import { permutations } from "./7_1_array.js";
import {
  JUMP_IF_0,
  JUMP_IF_NOT_0,
  LESS_THAN,
  EQUALITY,
  ADD,
  MULTIPLY,
  HALT
} from "./7_INS.js";
import { tape } from "./7_tape.js";

const INPUT_INSTRUCTION = {

  operation: (memory, writeAddress, inputObj, output) => {
    memory[writeAddress] = inputObj.inputs[inputObj.ptr++];
  },

  jump: (IP) => IP + 2
};
const OUTPUT = {

  operation: (tape, memoryAddressToRead, inputObj, output) => {
    output.push(tape[memoryAddressToRead]);
  },

  jump: (IP) => IP + 2
};

const INSTRUCTIONS = {
  '03': INPUT_INSTRUCTION,
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
  0: (memPtr, memory) => memory[memPtr]
};

const getParams = (paramModes, memPtr, memory) => {
  return paramModes
    .map((mode, index) => MODE_BIT[mode](memPtr + index + 1, memory));
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

const executeInstruction = (memPtr, memory, inputObj, output) => {
  const [p1, p2, p3, opcode] = getParamsAndOpcode(memory, memPtr);
  const passInputs = ['03', '04'].includes(opcode) ? [inputObj, output] : [p2, p3];

  const skipJump = INSTRUCTIONS[opcode].operation(memory, p1, ...passInputs, memPtr);

  return skipJump || INSTRUCTIONS[opcode].jump(memPtr, memory);
};

const computer = (amp) => {
  while (amp.ptr < amp.memory.length) {
    amp.ptr = executeInstruction(amp.ptr, amp.memory, amp.inputObj, amp.output);
  }
};

const inputCombos = permutations;

const thrustValues = [];
const createAmplifier = (memory, initialInputs, index) => {
  return {
    memory: [...memory],
    output: [],
    ptr: 0,
    inputObj: {
      inputs: [initialInputs/* [index] */],
      ptr: 0,
    }
  };
};
const createAmplifiers = (initialInputs, memory) => {
  const amplifiers = [];
  for (const initialInput of initialInputs) {
    const obj = createAmplifier(memory, initialInput);
    amplifiers.push(obj);
  }

  // for (let index = 0; index < initialInputs.length; index++) {
  //   const obj = createAmplifier(memory, initialInputs, index);

  //   amplifiers.push(obj);
  // };

  return amplifiers;
};

for (const combo of inputCombos) {
  const amplifiers = createAmplifiers(combo, tape);

  amplifiers[0].inputObj.inputs.push(0);//initialize the first object to take second input as 0


  for (let ampIndex = 0; ampIndex < amplifiers.length; ampIndex++) {
    const amp = amplifiers[ampIndex];
    computer(amp);

    const outputs = amp.output;

    amplifiers[(ampIndex + 1) % amplifiers.length].inputObj.inputs.push(outputs.at(-1));
  }

  thrustValues.push(amplifiers.at(-1).output.at(-1));
}

const maxThrust = Math.max(...thrustValues);
console.log(maxThrust);