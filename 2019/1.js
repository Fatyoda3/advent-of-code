
const parts = Deno.readTextFileSync('1.input').split('\n')
  .map((part) => calculateFuel(parseInt(part)));

const ins = [1969, 14, 12, 100756];
const outs = [966, 2, 2, 50346];

const calculateFuel = (value) => {
  const fuel = Math.floor(value / 3 - 2);
  if (fuel > 0) {
    return fuel + calculateFuel(fuel);
  }

  return 0;
};

console.log(parts.reduce((present, current) => present + current));
