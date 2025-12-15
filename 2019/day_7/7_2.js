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
  "0": (memPtr, memory) => memory[memPtr],
  "1": (memPtr) => memPtr
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

const executeInstruction = (pointer, memory, inputObject, output) => {
  const [p1, p2, memoryAddress, opcode] = getOpcodeAndParams(memory, pointer);
  const params = (['03', '04'].includes(opcode)) ? [inputObject, p1] : [p1, p2, memoryAddress];
  const jump = INSTRUCTIONS[opcode].operation(pointer, memory, ...params, output);

  return jump;
};

const createAmplifier = (value) => {
  return {
    inputObject: {
      inputArray: [value],
      inputPointer: 0
    },
    output: [],
    pointer: 0

  };
};
const createAmplifiers = (initialInputs) => {
  return initialInputs.map((initialInput) => createAmplifier(initialInput));
};

const computer = (memory, amplifier) => {
  const memoryLocal = [...memory];


  while (memoryLocal[amplifier.pointer] !== 99) {
    if (amplifier.inputObject.inputArray.length < amplifier.inputObject.inputPointer) {
      return;
    }

    amplifier.pointer = executeInstruction(amplifier.pointer, memoryLocal, amplifier.inputObject, amplifier.output);
  }

  return amplifier.output;
};

4, 3, 2, 1, 0;
1; const program = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
1; const initialInputs = [4, 3, 2, 1, 0];

// 2; const program = [3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0];
// 2; const initialInputs = [0, 1, 2, 3, 4];

// 3; const program = [3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33,
//   1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0];
// 3; const initialInputs = [1, 0, 4, 3, 2];

const amplifiers = createAmplifiers(initialInputs);

amplifiers[0].inputObject.inputArray.push(0);

while (amplifiers.at(-1)[amplifiers.at(-1).pointer] !== 99) {


  for (let index = 0; index < amplifiers.length; index++) {
    const output = computer([...program], amplifiers[index]);

    amplifiers[(index + 1) % amplifiers.length].inputObject.inputArray.push(output.at(-1));
  }
}

console.log('thrust generated ', amplifiers.at(-1).output);