// 2*l*w + 2*w*h + 2*h*l
const dimensions = Deno.readTextFileSync('./2.input').split('\n').map(dimension => dimension.split('x').map(y => +y));
// console.log(dimensions.slice(10));

const getArea = (l, w, h) => {
  const [a, b] = [l, w, h].sort((a, b) => a - b).slice(0, 2);
  console.log({ a, b });

  const f1 = l * w * h;

  const smallestFace = (a + a + b + b);
  const area = f1 + smallestFace;

  return area;
};

const total = dimensions.reduce((sum, currentDimensions) => {
  sum += getArea(...currentDimensions);
  return sum;
}, 0);

console.log({ total });

