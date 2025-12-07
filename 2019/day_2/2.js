import { program } from "./input.js";
const NOUN_ADDRESS = 1;
const VERB_ADDRESS = 2;

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

  return memoryLocal;
};

const part2 = () => {
  const target = 19690720;
  const results = [];

  let verb = 0;

  while (verb <= 99) {
    let noun = 0;

    while (noun <= 99) {
      const copy = [...program];

      copy[VERB_ADDRESS] = verb;
      copy[NOUN_ADDRESS] = noun;

      const result = computer(copy);
      results.push(result[0]);

      if (result[0] === target) {
        console.log(result[0] === target, { noun, verb, target });
        return { noun, verb, target };
      }

      noun += 1;
    }
    
    verb += 1;
  }
};
const part1 = () => {
  const copy1 = [...program];

  copy1[1] = 12;
  copy1[2] = 2;
  const result = computer([...copy1]);
  const target = 3765464;
  console.log(result[0] === target, { resultValue: result[0], target });
};

const main = () => {
  part1();
  const { verb, noun } = part2();
  console.log(100 * noun + verb);
};
main();