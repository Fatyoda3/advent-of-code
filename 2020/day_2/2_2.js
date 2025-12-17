const puzzle = Deno.readTextFileSync('./day_2/input.txt');

const inputs = [`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc` /* ,
  puzzle */];

const format = (input) => {
  return input.split('\n')
    .map(each => {
      const values = each.split(' ');
      console.log({ input });

      return {
        positions: values[0].split('-').map(vals => +vals),
        char: values[1][0],
        text: values[2]
      };
    });
};
const formatted = [];

for (const input of inputs) {
  const validate = format(input);
  formatted.push(...validate);
}

const isValid = (validate) => {
  const { positions, char, text } = validate;
  console.log({ positions }, validate);

  const [first, nonMatching] = positions;

  return text[first] === char && text[nonMatching] !== char;
};
console.log(isValid(inputs[0]));

// const vals = formatted.reduce((count, validate) => isValid(validate) ? count + 1 : count, 0);

// console.log({ vals });