const digits = [...'987654321111111'];
console.log(digits);

const permutate = (digits) => {
  const permutations = [];
  if (digits.length <= 1) {
    return [digits];
  }


  for (let i = 0; i < digits.length; i++) {

    const remaining = digits.filter(x => x != digits[i]);

    const perms = permutate(remaining);
    const f = perms.map(p => [digits[i], ...p]);
    permutations.push(...f);
  }

  return permutations;
};

// console.log(permutate([1, 2, 3]));
// console.log(permutate(digits));
