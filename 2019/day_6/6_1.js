const pathMap = "COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L"
  .split(',')
  .map(value => value.split(')'));
// const pathMap = Deno.readTextFileSync('6.input')
//   .split('\n')
//   .map((value) => value.split(')'));
const map = {};

function mapOrbiters() {

  for (let index = 0; index < pathMap.length; index++) {

    const [currentPlanet, orbiter] = pathMap[index];

    if (map[currentPlanet] === undefined) {
      map[currentPlanet] = { orbiters: [orbiter] };

    } else {
      map[currentPlanet].orbiters.push(orbiter);
    }
    if (map[orbiter] === undefined) {
      map[orbiter] = { orbiters: [] };
    }
  }

}

const traverseOrbiters = (head = 'COM') => {

  while (head !== undefined) {
    const orbiters = map[head].orbiters;

    if (orbiters.length === 0) {
      return head;
    }

    orbiters.forEach(orbiter => {
      count += 1;
      head = traverseOrbiters(orbiter);
    });

  }
  return head;
};

let count = 0;
const main = () => {
  mapOrbiters();

  for (const key in map) {
    traverseOrbiters(key);
  }

  console.log({ count });
};
main();