const dimensions = Deno.readTextFileSync('./2.input').split('\n').map(dimension => dimension.split('x').map(y => +y));

const getArea = (l, w, h) => {
  const [a, b] = [l, w, h].sort((a, b) => a - b).slice(0, 2);

  const f1 = l * w * h;

  const smallestFace = (2 * a + 2 * b);
  const area = f1 + smallestFace;

  return area;
};

const total = dimensions.reduce((sum, currentDimensions) => {
  sum += getArea(...currentDimensions);
  return sum;
}, 0);

console.log({ total });

