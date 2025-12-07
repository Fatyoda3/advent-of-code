import { program } from "./input.js";

const INSTRUCTIONS = {
  1: {
    operation: (memory, p1, p2, memoryAddress) => {
      memory[memoryAddress] = memory[p1] + memory[p2];
      return 4;
    }
  },
  2: {
    operation: (memory, p1, p2, memoryAddress) => {
      memory[memoryAddress] = memory[p1] * memory[p2];
      return 4;
    }
  }


};

// indirect access mode

const executeInstruction = (memory, pointer) => {
  const [opcode, parameter1, parameter2, memoryAddress] = memory.slice(pointer, pointer + 4);

  const jump = INSTRUCTIONS[opcode].operation(memory, parameter1, parameter2, memoryAddress);

  return pointer + jump;
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

program[1] = 12;
program[2] = 2;

const result = computer(program);

const TARGET_1 = 3765464;
console.log(result[0] === TARGET_1, { resultValue: result[0], TARGET_1 });

const TARGET_2 = 19690720;