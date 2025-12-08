import { input } from './input.js';

const INSTRUCTIONS = {
  '01': {
    operation: (pointer, memory, param1Address, param2Address, memoryAddress) => {
      memory[memoryAddress] = memory[param1Address] + memory[param2Address];

      return 4 + pointer;
    }
  },

  '02': {
    operation: (pointer, memory, param1Address, param2Address, memoryAddress) => {
      memory[memoryAddress] = memory[param1Address] * memory[param2Address];

      return 4 + pointer;
    }
  },

  '03': {
    operation: (pointer, memory, inputObject, memoryAddress) => {
      console.log('input memory address', memoryAddress);

      memory[memoryAddress] = inputObject.inputArray[inputObject.pointer++];
      console.log('input ', memory[memoryAddress]);

      return 2 + pointer;
    }
  },

  '04': {
    operation: (pointer, memory, inputObject, memoryAddress, output) => {
      output.push(memory[memoryAddress]);

      return 2 + pointer;
    }
  },

  '05': {
    operation: (pointer, memory, p1, p2) => {
      // console.log(pointer, p1, p2);

      const jump = memory[p1] !== 0 ? memory[p2] : pointer + 3;

      return jump;
    }
  },

  '06': {
    operation: (pointer, memory, p1, p2) => {
      const jump = memory[p1] === 0 ? memory[p2] : pointer + 3;
      return jump;
    }
  },

  '07':/* less than */ {
    operation: (pointer, memory, p1, p2, p3) => {
      memory[p3] = memory[p1] < memory[p2] ? 1 : 0;

      return pointer + 4;
    }
  },
  '08': {
    operation: (pointer, memory, p1, p2, p3) => {
      memory[p3] = memory[p1] === memory[p2] ? 1 : 0;
      console.log('mem stored', p3);

      return pointer + 4;
    }
  },

};
const MODE = {
  "0": (memPtr, memory) => memory[memPtr],//indirect mode is 0 I hate it 
  "1": (memPtr) => memPtr//direct mode is 1 I hate it even more
  //were the creators stupid 0 should mean direct access what is wrong with them 
};
//13818007

const getOpcodeAndParams = (memory, pointer) => {
  // console.log(pointer);

  const instruction = `${memory[pointer]}`.padStart(5, '0');
  console.log({ instruction });

  const [m3, m2, m1, ...code] = [...instruction];
  console.log({ m1 });

  const p1 = MODE[m1](pointer + 1, memory);//get first parameter
  const p2 = MODE[m2](pointer + 2, memory);//get second parameter
  const p3 = MODE[m3](pointer + 3, memory);//get third parameter (write address)

  const opcode = code.join('');

  return [p1, p2, p3, opcode];
};

const executeInstruction = (pointer, memory, inputObject, output) => {
  const [p1, p2, memoryAddress, opcode] = getOpcodeAndParams(memory, pointer);

  const params = (['03', '04'].includes(opcode)) ? [inputObject, p1] : [p1, p2, memoryAddress];

  console.log({ opcode }, pointer);

  const jump = INSTRUCTIONS[opcode].operation(pointer, memory, ...params, output);

  return jump;
};

const generateBuffer = (value = 1) => {
  const inputObject = {
    inputArray: [value],
    pointer: 0
  };

  const output = [];
  return [inputObject, output];

};

const computer = (memory) => {
  const memoryLocal = [...memory];
  let pointer = 0;
  const [inputObject, output] = generateBuffer(8);
  console.log({ len: memoryLocal.length });

  while (memoryLocal[pointer] !== 99) {
    pointer = executeInstruction(pointer, memoryLocal, inputObject, output);
  }

  console.log({ output });
  return memoryLocal;
};

// 0 indirect indirect access of value 
// 1 immediate direct access of value 

// const program = input;

// const program = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
// const program = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
// const program = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
// const program = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
const program = [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
  1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
  999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99];

computer(program);
