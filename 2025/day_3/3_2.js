// const batteryPack = "234234234234278";
// const batteryPack = "811111111111119";
// const batteryPacks = [
//   "987654321111111",
//   "811111111111119",
//   "234234234234278",
//   "818181911112111",
// ];
const batteryPack = Deno.readTextFileSync("./day_3/input.txt").split("\n");

//15 -12 at most 3 digits --4
//last value IDX
//15 -12-1 at most 2 digits --3
//last value IDX
//15 -12-2 at most 1 digits --4
//last value IDX

//15 -12-3 at most 1 digits --4

// const maxJolt = (battery) => {
//   const temps = [];

//   let remaining = 12;
//   let prevIdx = 0;

//   while (remaining >= 0) {
//     let max = -Infinity;

//     const maxChecks = battery.length - 12 - temps.length - 1;

//     if (maxChecks === 0) {
//       temps.push(...battery.slice(prevIdx + 1, remaining));
//       console.log(temps.join(""));

//       return;
//     }

//     console.log({ maxChecks, prevIdx });
//     for (let i = prevIdx; i <= maxChecks; i++) {
//       if (max < parseInt(battery[i])) {
//         max = parseInt(battery[i]);
//       }
//     }

//     prevIdx = battery.indexOf(max + "", prevIdx) + 1;
//     temps.push(max);
//     // prevIdx += 1;
//     remaining -= 1;
//   }

//   console.log("-------------------------------------");
//   console.log(temps.join(""));
// };

const maxJolt = (battery) => {
  const highest = [];
  const required = 12;
  let idx = 0;

  while (highest.length !== required) {
    let max = -Infinity;
    const maxChecks = battery.length - (required - highest.length - 1);
    for (let i = idx; i < maxChecks; i++) {
      max = Math.max(max, +battery[i]);
    }
    idx = battery.indexOf(max + "", idx) + 1;

    highest.push(max);
  }
  return +(highest.join(""));
};

const x = batteryPack.reduce((sum, bP) => sum + maxJolt(bP), 0);
console.log({ x });
