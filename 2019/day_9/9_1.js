import { appleBanana } from "./input.js";
let relativeBase = 0;

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

      memory[memoryAddress] = inputObject.inputArray[inputObject.inputPointer++];

      return 2 + pointer;
    }
  },
  '04': {
    operation: (pointer, memory, inputObject, memoryAddress, output) => {
      // console.log({ memoryAddress, pointer }, { lo: memory[pointer + 2] });

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
  '09': {
    operation: (pointer, memory, p1, p2, p3) => {

      relativeBase += memory[p1];

      return pointer + 2;

    }
  }
};

const MODE = {
  "0": (memPtr, memory) => memory[memPtr],
  "1": (memPtr) => memPtr,
  "2": (memPtr, memory) => memory[memPtr] + relativeBase
};

const getOpcodeAndParams = (memory, pointer) => {

  const instruction = `${memory[pointer]}`.padStart(5, '0');

  const [m3, m2, m1, ...code] = [...instruction];

  const p1 = MODE[m1](pointer + 1, memory);
  const p2 = MODE[m2](pointer + 2, memory);
  const p3 = MODE[m3](pointer + 3, memory);

  const opcode = code.join('');

  return [p1, p2, p3, opcode];
};

const handleOOR = (memory, value) => {
  if (value < 0 || memory[value] === undefined) {
    return 0;
  }

  return value;
};

const executeInstruction = (pointer, memory, inputObject, output) => {
  let [p1, p2, memoryAddress, opcode] = getOpcodeAndParams(memory, pointer);

  const newP1 = handleOOR(memory, p1); // so writing on oob is valid 
  // SO there is no need for this to be passed
  p2 = handleOOR(memory, p2);


  const params = (['03', '04'].includes(opcode)) ? [inputObject, p1] : [newP1, p2, memoryAddress];

  const jump = INSTRUCTIONS[opcode].operation(pointer, memory, ...params, output);

  return jump;
};

const createDummy = (value) => {
  return {
    inputObject: {
      inputArray: [value],
      inputPointer: 0
    },

    output: [],
    pointer: 0
  };
};

const computer = (memory, amplifier) => {
  const memoryLocal = [...memory];

  while (memoryLocal[amplifier.pointer] !== 99) {
    if (amplifier.inputObject.inputArray.length < amplifier.inputObject.inputPointer) {
      return;
    }

    amplifier.pointer = executeInstruction(
      amplifier.pointer,
      memoryLocal,
      amplifier.inputObject,
      amplifier.output,
    );
  }

  return amplifier.output;
};


const program = appleBanana;
const amplifier = createDummy(2);

const out = computer([...program], amplifier);

console.log({ out });
