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

  // operation: (tape, writeAddress, firstInput, remaining) => {
  operation: (tape, writeAddress, inputObj, output) => {


    tape[writeAddress] = inputObj.inputs[inputObj.ptr++];

    // const input1 = firstInput.shift();
    // if (input1 !== undefined) {
    //   INPUTS.push(tape[writeAddress]);
    //   return;
    // }
    // if (cold_store.length === 1 && writeCount === 2) {
    //   writeCount = 1;
    //   const secondInput = cold_store.pop();
    //   tape[writeAddress] = secondInput;
    //   return;
    // }

    // tape[writeAddress] = remaining[cycleSecondInput++];
    // INPUTS.push(tape[writeAddress]);
    // writeCount += 1;

  },

  jump: (IP) => IP + 2
};
const OUTPUT = {
  operation: (tape, memoryAddressToRead, input, output) => {



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

const executeInstruction = (memPtr, memory, inputObj, output) => {
  const [p1, p2, p3, opcode] = getParamsAndOpcode(memory, memPtr);
  const passInputs = ['03', "04"].includes(opcode) ? [inputObj, output] : [p2, p3];


  const skipJump = INSTRUCTIONS[opcode].operation(memory, p1, ...passInputs, memPtr);

  return skipJump || INSTRUCTIONS[opcode].jump(memPtr, memory);
};

const computer = (amp) => {

  while (amp.ptr < amp.memory.length) {


    amp.ptr = executeInstruction(amp.ptr, amp.memory, amp.inputObj, amp.output);
  }


};

const generatePartedInput = (inputSet) => [[inputSet[0], 0], inputSet.slice(1)];


const inputCombos = permutations;



const programData = [
  3, 15, 3, 16,
  1002, 16, 10,
  16, 1, 16,
  15, 15, 4,
  15, 99, 0, 0];
const thrustValues = [];
// let halt = 0;
const createObjectUsingInputs = (inputs, memory) => {
  const objs = [];
  for (let index = 0; index < inputs.length; index++) {


    const obj = {
      memory: [...memory],
      output: [],
      ptr: 0,
      inputObj: {
        inputs: [inputs[index]],
        ptr: 0,
      }
    };
    objs.push(obj);
  }
  return objs;
};

for (const combo of inputCombos) {


  const newAmplifiers = createObjectUsingInputs(combo, tape);

  newAmplifiers[0].inputObj.inputs.push(0);


  for (let ampIndex = 0; ampIndex < newAmplifiers.length; ampIndex++) {

    const amp = newAmplifiers[ampIndex];
    computer(amp);

    const outputs = amp.output;

    newAmplifiers[(ampIndex + 1) % newAmplifiers.length].inputObj.inputs.push(outputs.at(-1));

  }
  thrustValues.push(newAmplifiers.at(-1).output.at(-1));
}

const maxThrust = Math.max(...thrustValues);
console.log(maxThrust);