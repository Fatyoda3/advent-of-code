const input = Deno.readTextFileSync('5.input').split('\n');
const input = Deno.readTextFileSync('2.input').split(',').map(val => +val);

const SKIP_4 = 4;
const INVALID = 1;

const readInstruction = ([opcode, operandA, operandB, writeLocation], tape) => {

  if (opcode === 1) {
    tape[writeLocation] = tape[operandA] + tape[operandB];
    return SKIP_4;
  }
  if (opcode === 2) {
    tape[writeLocation] = tape[operandA] * tape[operandB];
    return SKIP_4;
  }
  if (opcode === 99) {
    return tape.length;
  }
  return INVALID;
};

const computer = (tape, verb, noun) => {
  tape[1] = noun;
  tape[2] = verb;

  let IP = 0;
  while (IP < tape.length) {
    IP += readInstruction(tape.slice(IP, IP + 4), tape);
  }
  console.log(tape[0]);

  return tape[0];
};

const t = () => {
  let output = 0;
  let [verb, noun] = [0, 0];
  while (verb <= 99) {
    noun = 0;
    while (noun <= 99) {
      output = computer([...input], verb, noun);
      if (output === 19690720) {
        return {verb, noun, output};
      }
      noun++;
    }
    verb++;
  }

  return 'BANANA';
};
console.log(t());
