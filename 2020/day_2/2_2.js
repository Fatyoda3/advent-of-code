const puzzle = Deno.readTextFileSync('./day_2/input.txt');

const inputs = [`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc` ,
  puzzle];

const format = (input) => {
  return input.split('\n')
    .map(each => {
      const values = each.split(' ');

      return {
        positions: values[0].split('-').map(vals => (+vals) - 1),
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
  const [first, nonMatching] = positions;
  console.log({ first, nonMatching }, text[first], text[nonMatching]);

  console.log(char, text, text[first] === char, text[nonMatching] === char);

  return (text[first] === char) !== (text[nonMatching] === char);
};

const vals = formatted.reduce((count, validate) => isValid(validate) ? count + 1 : count, 0);
console.log({ vals });