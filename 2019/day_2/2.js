// const TAPE = Deno.readTextFileSync('2.input').split(',').map(val => +val);
// const TAPE = [1, 0, 0, 0, 99];
const TAPE = [2, 3, 0, 3, 99];
const TARGET = 19690720;

const INSTRUCTIONS = {
  1: {
    operation: (memory, p1, p2, memoryAddress) => {
      memory[memoryAddress] = memory[p1] + memory[p2];
    }
  },
  2: {
    operation: (memory, p1, p2, memoryAddress) => {
      memory[memoryAddress] = memory[p1] *  memory[p2];
    }
  }


};

// indirect access mode

const executeInstruction = (memory, pointer) => {
  const [opcode, parameter1, parameter2, memoryAddress] = memory.slice(pointer, pointer + 4);
  console.log({ opcode, parameter1, parameter2, memoryAddress });

  INSTRUCTIONS[opcode].operation(memory, parameter1, parameter2, memoryAddress);

  return pointer + 4;
};

const computer = (memory) => {
  const memoryLocal = [...memory];
  let pointer = 0;

  while (memory[pointer] !== 99) {
    pointer = executeInstruction(memoryLocal, pointer);
  }

  console.log('exited out!');
  return memoryLocal;
};

const result = computer(TAPE);
console.log(result);