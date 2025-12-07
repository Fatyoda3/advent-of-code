// const input = Deno.readTextFileSync('./day_3/3.input').split('\n');
const deltas = {
  R: { x: 1, y: 0 },
  L: { x: - 1, y: 0 },
  U: { x: 0, y: 1 },
  D: { x: 0, y: - 1 }
};

const operations = (path) => path.map(([heading, ...rest]) => ({
  heading,
  val: parseInt(rest.join(''))
}));

const path1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(',');
const path2 = 'U62,R66,U55,R34,D71,R55,D58,R83'.split(',');

const wire1 = { x0: 0, y0: 0 };
const wire2 = { x0: 0, y0: 0 };

function traceSteps(path, wire) {
  const performed = operations(path);
  const posTaken = [];
  let step = 0;

  for (const { heading, val } of performed) {
    for (let index = 0; index < val; index++) {

      posTaken.push({ ...wire, step });
      const { x, y } = deltas[heading];

      wire.x0 += x;
      wire.y0 += y;
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
      if (positionsTaken1[i].x0 === positionsTaken2[j].x0 &&
        positionsTaken1[i].y0 === positionsTaken2[j].y0) {
        const current = positionsTaken1[i].step + positionsTaken2[j].step;
        minDistance = Math.min(current, minDistance);
      }
    }
  }
  console.log(minDistance);

}

const intersects = crosses(positionsTaken1, positionsTaken2);


