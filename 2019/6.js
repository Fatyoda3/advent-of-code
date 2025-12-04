const pathMap = "COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L,K)YOU,I)SAN"
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
// let f = 1;
const path1 = [];
let flag = false;
// let flag = false;

const traverseOrbiters = (head = 'COM', traverseTo, path) => {
  // console.log('value ', traverseTo, map[head]);
  if (map[head].orbiters.includes(traverseTo)) {
    console.log('here ');
    flag = true;
    return;
  }
// 443
  while (head !== undefined) {

    const orbiters = map[head].orbiters;
    if (orbiters.length === 0) {
      return head;
    }

    path.push(head);
    orbiters.forEach(orbiter => {
      count += 1;
      if (flag) return;
      head = traverseOrbiters(orbiter, traverseTo , path);
    });

  }
  return head;
};

let count = 0;
const main = () => {
  mapOrbiters();

  // traverseOrbiters('COM', 'YOU', path1);
  // flag = false;
  // const path2 = [];
  // traverseOrbiters('COM', 'SAN', path2);
  // for (const key in map) {
  // // traverseOrbiters('K');
  // traverseOrbiters(key);
  // }
  // console.log('you path',path1);
  // console.log('santa path',path2);

  // // console.log({ f });
  console.log(map);

  // console.log({ count });
};
main();