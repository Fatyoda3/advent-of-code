const example =
  `987654321111111
811111111111119
234234234234278
818181911112111`
    .split('\n');

const batteryPack = ['987654321111111'];
//9 scan ahead if it is highest true then push
// if some larger is found then use it and then reset 
// const batteryPack = Deno.readTextFileSync('./2025/day_3/input.txt').split('\n');
// 12 digits
// skip some digits in between
// maintain order 
const t = '811111111111119';

const getMaxValue = (battery) => {
  const formed = [];

// for (let i = 0; i < array.length; i++) {
//   const element = array[i];
  
// }

};

const puzzleAnswer = example.reduce((prev, battery) => prev + getMaxValue(battery), 0);
console.log({ puzzleAnswer });