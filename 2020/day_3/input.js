export const input = Deno
  .readTextFileSync('./day_3/input.txt')
  .split('\n').map(row => row.split(''));