// const input = Deno.readTextFileSync('./2019/day_5/5.input').split(',').map((val) => +val);

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


  const p1 = MODE[m1](pointer + 1, memory);
  const p2 = MODE[m2](pointer + 2, memory);
  const p3 = MODE[m3](pointer + 3, memory);

  const opcode = code.join('');

  return [p1, p2, p3, opcode];
};
const executeInstruction = (memory, pointer) => {
  const [p1, p2, p3, opcode] = getOpcodeAndParams(memory, pointer);

  const jump = INSTRUCTIONS[opcode].operation(memory, p1, p2, p3);

  return pointer + jump;
};

const computer = (memory) => {
  const memoryLocal = [...memory];
  let pointer = 0;

  while (memoryLocal[pointer] !== 99) {
    pointer = executeInstruction(memoryLocal, pointer);
  }

  return memoryLocal;
};

// 0 indirect indirect access of value 
// 1 immediate direct access of value 

const program = [1002, 4, 3, 4, 33];
console.log(computer(program));