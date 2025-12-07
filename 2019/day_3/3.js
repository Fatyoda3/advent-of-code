// const input = Deno.readTextFileSync('./day_3/3.input').split('\n');
const deltas = {
  R: { dx: 1, dy: 0 },
  L: { dx: - 1, dy: 0 },
  U: { dx: 0, dy: 1 },
  D: { dx: 0, dy: - 1 }
};

const operations = (path) => path.map(([heading, ...rest]) => ({
  heading,
  val: parseInt(rest.join(''))
}));

const path1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(',');
const path2 = 'U62,R66,U55,R34,D71,R55,D58,R83'.split(',');

const wire1 = { x: 0, y: 0 };
const wire2 = { x: 0, y: 0 };

function traceSteps(path, wire) {
  const performed = operations(path);
  const posTaken = [];
  let step = 0;

  for (const { heading, val } of performed) {
    for (let index = 0; index < val; index++) {

      posTaken.push({ ...wire, step });
      const { dx, dy } = deltas[heading];

      wire.x += dx;
      wire.y += dy;

      step += 1;

    }
    posTaken.push({ ...wire });

  }
  return posTaken;
}

const positionsTaken1 = traceSteps(path1, wire1);
const positionsTaken2 = traceSteps(path2, wire2);

function crosses(positionsTaken1, positionsTaken2) {
  let minDistance = Infinity;
  for (let i = 1; i < positionsTaken1.length; i++) {
    for (let j = 1; j < positionsTaken2.length; j++) {
      if (positionsTaken1[i].x === positionsTaken2[j].x&&
        positionsTaken1[i].y === positionsTaken2[j].y) {
        const current = positionsTaken1[i].step + positionsTaken2[j].step;
        minDistance = Math.min(current, minDistance);
      }
    }
  }
  return minDistance;
}

const minDistance = crosses(positionsTaken1, positionsTaken2);
console.log({minDistance});