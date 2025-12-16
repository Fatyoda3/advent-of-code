const inputs = {
  first: [
    "11-22",
    "95-115",
    "998-1012",
    "1188511880-1188511890",
    "222220-222224",
    "1698522-1698528",
    "446443-446449",
    "38593856-38593862",
    "565653-565659",
    "824824821-824824827",
    "2121212118-2121212124"
  ].map(value => {
    const [min, max] = value.split('-'); return {
      min: parseInt(min),
      max: parseInt(max)
    };
  })
  ,
  puzzle: [
    { min: 2157315, max: 2351307 },
    { min: 9277418835, max: 9277548385 },
    { min: 4316210399, max: 4316270469 },
    { min: 5108, max: 10166 },
    { min: 872858020, max: 872881548 },
    { min: 537939, max: 575851 },
    { min: 712, max: 1001 },
    { min: 326613, max: 416466 },
    { min: 53866, max: 90153 },
    { min: 907856, max: 1011878 },
    { min: 145, max: 267 },
    { min: 806649, max: 874324 },
    { min: 6161532344, max: 6161720341 },
    { min: 1, max: 19 },
    { min: 543444404, max: 543597493 },
    { min: 35316486, max: 35418695 },
    { min: 20, max: 38 },
    { min: 84775309, max: 84908167 },
    { min: 197736, max: 309460 },
    { min: 112892, max: 187377 },
    { min: 336, max: 552 },
    { min: 4789179, max: 4964962 },
    { min: 726183, max: 793532 },
    { min: 595834, max: 656619 },
    { min: 1838, max: 3473 },
    { min: 3529, max: 5102 },
    { min: 48, max: 84 },
    { min: 92914229, max: 92940627 },
    { min: 65847714, max: 65945664 },
    { min: 64090783, max: 64286175 },
    { min: 419838, max: 474093 },
    { min: 85, max: 113 },
    { min: 34939, max: 52753 },
    { min: 14849, max: 30381 }
  ]
};

let invalid = 0;
let invalidIDsSum = 0;

const sumUp = () => {

  for (const { min, max } of inputs.puzzle) {
    for (let invalidID = min; invalidID <= max; invalidID++) {
      const str = `${invalidID}`;

      if (str.slice(0, str.length / 2) === str.slice(str.length / 2)) {

        invalid += 1;
        invalidIDsSum += invalidID;

      }
    }
  }
};

console.log({ invalid, invalidIDsSum });