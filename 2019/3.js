// const input = Deno.readTextFileSync('3.input').split('\n');

const deltas = {
  R: (x, y) => ({ x: x + 1, y }),
  L: (x, y) => ({ x: x - 1, y }),
  U: (x, y) => ({ x, y: y + 1 }),
  D: (x, y) => ({ x, y: y - 1 })
};

const operations = (path) => path.map((instruction) => ({
  heading: instruction[0],
  val: +(instruction.slice(1))
}));

// const [path1, path2] = input.map(value => value.split(','));
// const path1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'.split(',');
const path1 = 'R8,U5,L5,D3'.split(',');
const wire1 = { x0: 0, y0: 0 };
const path2 = 'U7,R6,D4,L4'.split(',');
const wire2 = { x0: 0, y0: 0 };

function traceSteps(path, wire) {
  const performed = operations(path);
  const posTaken = [];

  for (const { heading, val } of performed) {
    for (let index = 0; index < val; index++) {
      const { x0, y0 } = wire;
      const { x, y } = deltas[heading](x0, y0);

      posTaken.push({ ...wire });

      wire.x0 = x;
      wire.y0 = y;

    }
    posTaken.push({ ...wire });

  }
  return posTaken;
}

const positionsTaken1 = traceSteps(path1, wire1);
const positionsTaken2 = traceSteps(path2, wire2);

function crosses(positionsTaken1, positionsTaken2) {
  const intersects = [];

  for (let index = 1; index < positionsTaken1.length; index++) {
    for (let j = 1; j < positionsTaken2.length; j++) {
      if (positionsTaken1[index].x0 === positionsTaken2[j].x0 &&
        positionsTaken1[index].y0 === positionsTaken2[j].y0) {
        intersects.push(positionsTaken1[index]);
      }
    }
  }
  return intersects;
}

const intersects = crosses(positionsTaken1, positionsTaken2);

let distance = Infinity;
for (let index = 0; index < intersects.length; index++) {
  const d = Math.abs(intersects[index].x0) + Math.abs(intersects[index].y0);
  if (d < distance) {
    distance = d;
  }
}

console.log(distance);
