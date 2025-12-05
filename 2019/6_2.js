// const pathMap = "COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L,K)YOU,I)SAN"
//   .split(',')
//   .map(value => value.split(')'));
const pathMap = Deno.readTextFileSync('6.input')
  .split('\n')
  .map((value) => value.split(')'));
//442
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

const hasChild = (map, head, traverseTo) => {
  const children = map[head].orbiters;
  if (children.includes(traverseTo)) {

    return true;
  }
  return children
    .some((each) => hasChild(map, each, traverseTo));
};

const traverseOrbiters = (head, traverseTo) => {
  if (map[head].orbiters.includes(traverseTo)) {
    return 0;
  }
  const orbiter = map[head].orbiters
    .find(orbiter => hasChild(map, orbiter, traverseTo));

  return 1 + traverseOrbiters(orbiter, traverseTo);
};

const main = () => {
  mapOrbiters();

  let min = Infinity;
  for (const key in map) {

    if (hasChild(map, key, 'SAN') && hasChild(map, key, 'YOU')) {
      const distanceBetween = traverseOrbiters(key, 'SAN');
      const distanceBetween2 = traverseOrbiters(key, 'YOU');
     
      const totalDistance = distanceBetween + distanceBetween2;
     
      if (min > totalDistance) {
        min = totalDistance;
      }
    }

  }


  console.log(min);

};

main();