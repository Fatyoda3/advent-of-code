
/* At the first Go / No Go poll, every Elf is Go until the Fuel Counter-Upper. 
They haven't determined the amount of fuel required yet.

Fuel required to launch a given module is based on its mass. Specifically, 
to find the fuel required for a module, 
take its mass,
 divide by three,
 round down,
 and subtract 2.

For example:

    For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
    For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.
    For a mass of 1969, the fuel required is 654.
    For a mass of 100756, the fuel required is 33583.

The Fuel Counter-Upper needs to know the total fuel requirement. To find it, 
individually calculate the fuel needed for the mass of each module (your puzzle input), 
then add together all the fuel values.

What is the sum of the fuel requirements 
for all of the modules on your spacecraft?
 */
const input = Deno.readTextFileSync('1.input');
const ins = [1969, 14, 12, 100756];
const outs = [966, 2, 2, 50346];
const totalFuelNeeded = (value) => {
  if (Math.floor(value / 3 - 2) > 0) {
    console.log(value, 'at the end is ');
    return (Math.floor(value / 3 - 2) + totalFuelNeeded(Math.floor(value / 3 - 2)));
  }
  console.log('current + pass to next call', Math.floor(value / 3 - 2));
  return 0;

};

// const f = ins.map(val => console.log('marking new call', val) || totalFuelNeeded(val));
// console.log(f, '<===ins|outs ===>', outs);

const allPartsFuel = input.split('\n').map((partWeight) => totalFuelNeeded(parseInt(partWeight)));

console.log(allPartsFuel.reduce((p, c) => p + c));
