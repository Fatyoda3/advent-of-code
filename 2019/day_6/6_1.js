const mapOrbiters = (pathMap) => {
  const map = {};

  for (const [planet, orbiter] of pathMap) {

    if (map[planet] === undefined) {
      map[planet] = { orbiters: [] };
    }
    map[planet].orbiters.push(orbiter);


    if (map[orbiter] === undefined) {
      map[orbiter] = { orbiters: [] };
    }

  }

  return map;
};

const input = Deno.readTextFileSync('./2019/day_6/6.input').split('\n').map(pair => pair.split(')'));
const map = mapOrbiters(input);

// const pathMap = "COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L".split(',').map(pair => pair.split(')'));
// const map = mapOrbiters(pathMap);
// console.log(map);

let count = 0;
// 247089

const countOrbiters = (start, map) => {

  while (start !== undefined) {
    const orbiters = map[start].orbiters;

    if (orbiters.length !== 0) {

      orbiters.forEach(orbiter => {
        count += 1;

        start = countOrbiters(orbiter, map);
      });
    }

    return start;
  };

};

for (const planet in map) {
  countOrbiters(planet, map);
}

console.log({ count }, 247089);
