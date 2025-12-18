const example = `987654321111111
811111111111119
234234234234278
818181911112111`.split('\n');

const batteryPack = Deno.readTextFileSync('./2025/day_3/input.txt').split('\n');

const getJoltage = (battery) => {
  let max = -Infinity;

  for (let i = 0; i < battery.length; i++) {
    for (let j = i + 1; j < battery.length; j++) {
      max = Math.max(max, parseInt(battery[i] + battery[j]));
    }
  }
  return max;
};
const f = batteryPack.map(battery => getJoltage(battery));

// console.log({ f });
console.log(f.reduce((prev, current) => prev + current));

