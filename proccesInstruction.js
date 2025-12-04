const ins = `01002`;
const tape = [1002, 4, 3, 4, 33];

const opcode = ins.slice(-2);
const addressingMode = ins.slice(0, ins.length - 2).split('').reverse();
const writeMode = addressingMode
  .map((mode, index) => ({ mode, operand: tape[index + 1] }));

console.log(writeMode);
