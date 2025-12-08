const pathMap = "COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L".split(',').map(pair => pair.split(')'));
// 42
const mapOrbiters = (pathMap) => {
  const map = {};
  for (const [planet, orbiter] of pathMap) {
    if (map[planet] === undefined) {
      map[planet] = [];
    }

    map[planet].push(orbiter);

    if (map[orbiter] === undefined) {
      map[orbiter] = [];
    }
  }

  return map;
};

const map = mapOrbiters(pathMap);

const wrapper = (map) => {
  let count = 0;

  const traverseOrbiters = (start ,map) => {
    count += 1;

    while (start !== undefined) {
      start = traverseOrbiters(map[start], map);
    }

    return start;
  };

  for (const planet in map) {

    traverseOrbiters(planet, map);
  }

  return count;
};

const count = wrapper(map);

console.log({ count });
