export const input = Deno
  .readTextFileSync("./2020/day_3/input.txt")
  .split("\n").map((row) => row.split(""));

// export const input = Deno
//   .readTextFileSync('./2020/day_3/puzzle.txt')
//   .split('\n').map(row => row.split(''));
