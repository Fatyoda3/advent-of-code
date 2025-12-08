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
    operation: (pointer, memory, memoryAddress, inputObject) => {

      memory[memoryAddress] = inputObject.inputArray[inputObject.pointer++];

      return 2 + pointer;
    }
  },

  '04': {
    operation: (pointer, memory, memoryAddress, _, output) => {
      output.push(memory[memoryAddress]);

      return 2 + pointer;
    }
  },

  '05': {
    operation: (pointer, memory, p1, p2) => {
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

      return pointer + 4;
    }
  },

};
const MODE = {
  "0": (memPtr, memory) => memory[memPtr], //indirect mode is 0 I hate it 
  "1": (memPtr) => memPtr//direct mode is 1 I hate it even more
  //were the creators stupid 0 should mean direct access what is wrong with them 
};

const getOpcodeAndParams = (memory, pointer) => {
  const instruction = `${memory[pointer]}`.padStart(5, '0');

  const [m3, m2, m1, ...code] = [...instruction];

  const p1 = MODE[m1](pointer + 1, memory);//get first parameter
  const p2 = MODE[m2](pointer + 2, memory);//get second parameter
  const p3 = MODE[m3](pointer + 3, memory);//get third parameter (write address)

  const opcode = code.join('');

  return [p1, p2, p3, opcode];
};

const executeInstruction = (pointer, memory, inputObject, output) => {
  const [p1, p2, memoryAddress, opcode] = getOpcodeAndParams(memory, pointer);

  const params = (['03', '04'].includes(opcode)) ? [p1, inputObject] : [p1, p2, memoryAddress];

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

  const [inputObject, output] = generateBuffer(5);

  while (memoryLocal[pointer] !== 99) {
    pointer = executeInstruction(pointer, memoryLocal, inputObject, output);
  }
  console.log(output);

  return memoryLocal;
};
//4,3,2,1,0

const program = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];

computer(program);