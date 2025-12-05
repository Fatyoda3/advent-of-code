const ADD = {
  operation: (tape, address1, address2, writeAt) => {
    const param1 = tape[address1];
    const param2 = tape[address2];

    tape[writeAt] = param1 + param2;
  },
  jump: (IP) => IP + 4
};
const MULTIPLY = {
  operation: (tape, address1, address2, writeAt) => {
    const param1 = tape[address1];
    const param2 = tape[address2];

    tape[writeAt] = param1 * param2;
  },
  jump: (IP) => IP + 4
};
const EQUALITY = {
  operation: (tape, p1Add, p2Add, p3Add) => {
    if (tape[p1Add] === tape[p2Add]) {
      tape[p3Add] = 1;
    } else {
      tape[p3Add] = 0;
    }
  },

  jump: (IP) => IP + 4

};
const LESS_THAN = {
  operation: (tape, p1Add, p2Add, p3Add) => {
    if (tape[p1Add] < tape[p2Add]) {
      tape[p3Add] = 1;
    } else {
      tape[p3Add] = 0;
    }
  },

  jump: (IP) => IP + 4

};
const JUMP_IF_NOT_0 = {
  operation: (tape, p1Add, p2Add, _) => {
    if (tape[p1Add] !== 0) {
      return tape[p2Add];
    }
  },
  jump: (IP) => IP + 3

};
const JUMP_IF_0 = {
  operation: (tape, p1Add, p2Add, _) => {
    if (tape[p1Add] === 0) {
      return tape[p2Add];
    }
  },
  jump: (IP) => IP + 3

};

export {
  JUMP_IF_0,
  JUMP_IF_NOT_0,
  LESS_THAN,
  EQUALITY,
  ADD,
  MULTIPLY,
};