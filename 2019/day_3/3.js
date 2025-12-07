// const input = Deno.readTextFileSync('./day_3/3.input').split('\n');
const deltas = {
  R: { dx: 1, dy: 0 },
  L: { dx: - 1, dy: 0 },
  U: { dx: 0, dy: 1 },
  D: { dx: 0, dy: - 1 }
};

const operations = (path) => path.map(([heading, ...steps]) => ({
  heading,
  val: parseInt(steps.join(''))
}));


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

function findMinimumSteps(path1, path2) {
  let minimumSteps = Infinity;

  for (let i = 1; i < path1.length; i++) {

    for (let j = 1; j < path2.length; j++) {

      if (path1[i].x === path2[j].x && path1[i].y === path2[j].y) {
        const currentSteps = path1[i].step + path2[j].step;

        minimumSteps = Math.min(currentSteps, minimumSteps);
      }
    }
  }
  return minimumSteps;
}

function findMinimumDistance(path1, path2) {
  let minimumDistance = Infinity;

  for (let i = 1; i < path1.length; i++) {

    for (let j = 1; j < path2.length; j++) {

      if (path1[i].x === path2[j].x && path1[i].y === path2[j].y) {
        const currentDistance = Math.abs(path1[i].x) + Math.abs(path1[i].y);

        minimumDistance = Math.min(currentDistance, minimumDistance);
      }
    }
  }
  return minimumDistance;
}
const steps1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(',');
const steps2 = 'U62,R66,U55,R34,D71,R55,D58,R83'.split(',');

const wire1 = { x: 0, y: 0 };
const wire2 = { x: 0, y: 0 };

const path1 = traceSteps(steps1, wire1);
const path2 = traceSteps(steps2, wire2);

const minSteps = findMinimumSteps(path1, path2);
const minimumDistance = findMinimumDistance(path1, path2);

console.log({ minimumDistance, minSteps });