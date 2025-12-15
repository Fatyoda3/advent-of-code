// 2*l*w + 2*w*h + 2*h*l
const dimensions = Deno.readTextFileSync('./2.input').split('\n').map(dimension => dimension.split('x').map(y => +y));
console.log(dimensions.slice(10));

const getArea = (l, w, h) => {

  const f1 = l * w;
  const f2 = w * h;
  const f3 = h * l;

  const smallestFace = Math.min(f1, f2, f3);
  const area = (2 * (f1 + f2 + f3)) + smallestFace;

  return area;
};


const total = dimensions.reduce((sum, currentDimensions) => {
  sum += getArea(...currentDimensions);
  return sum;
}, 0);

console.log({ total });

