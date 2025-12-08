import { input } from './input.js';

const INSTRUCTIONS = {
  '01': {
    operation: (memory, p1, p2, memoryAddress) => {
      memory[memoryAddress] = memory[p1] + memory[p2];
      return 4;
    }
  },
  '02': {
    operation: (memory, p1, p2, memoryAddress) => {
      memory[memoryAddress] = memory[p1] * memory[p2];
      return 4;
    }
  },
  '03': {
    operation: (memory, inputObject, memoryAddress) => {
      console.log("input taken ");
      memory[memoryAddress] = inputObject.inputArray[inputObject.pointer++];
      return 2;
    }
  },
  '04': {

    operation: (memory, inputObject, memoryAddress, output) => {
    
      output.push(memory[memoryAddress]);
      console.log(memory[memoryAddress], memoryAddress);

      return 2;
    }
  }
};
const MODE = {
  0: (memPtr, memory) => memory[memPtr],//indirect mode is 0 I hate it 
  1: (memPtr) => memPtr,//direct mode is 1 I hate it even more
  //were the creators stupid 0 should mean direct access what is wrong with them 
};

const getOpcodeAndParams = (memory, pointer) => {
  const instruction = `${memory[pointer]}`.padStart(5, '0');
  const [m1, m2, m3, ...code] = [...instruction];

  const p1 = MODE[m1](pointer + 1, memory);//get first parameter
  const p2 = MODE[m2](pointer + 2, memory);//get second parameter
  const p3 = MODE[m3](pointer + 3, memory);//get third parameter (write address)

  const opcode = code.join('');

  return [p1, p2, p3, opcode];
};
const executeInstruction = (memory, pointer, inputObject, output) => {
  const [p1, p2, p3, opcode] = getOpcodeAndParams(memory, pointer);

  const params = (['03', '04'].includes(opcode)) ? [inputObject] : [p1, p2];
  const jump = INSTRUCTIONS[opcode].operation(memory, ...params, p3, output );

  return pointer + jump;
};  

const computer = (memory) => {
  const memoryLocal = [...memory];
  let pointer = 0;
  const inputObject = {
    inputArray: [1],
    pointer: 0
  };

  const output = [];

  while (memoryLocal[pointer] !== 99) {
    pointer = executeInstruction(memoryLocal, pointer, inputObject, output);
  }
  console.log(inputObject);

  return memoryLocal;
};

// 0 indirect indirect access of value 
// 1 immediate direct access of value 

// const program = [1002, 4, 3, 4, 33];
const program = input;
computer(program);