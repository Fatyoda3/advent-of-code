const pathMap = "COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L"
  .split(',')
  .map(value => value.split(')'));
const map = {};

function mapOrbiters() {
  for (let index = 0; index < pathMap.length; index++) {

    const currentPlanet = pathMap[index][0];
    const orbiter = pathMap[index][1];

    if (map[currentPlanet] === undefined) {
      map[currentPlanet] = { orbiters: [orbiter] };
    } else {
      map[currentPlanet].orbiters.push(orbiter);
    }
  }
}

const main = () => {
  mapOrbiters();
  console.log(map);
};
main();