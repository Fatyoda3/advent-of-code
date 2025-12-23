import { passports } from "./passports.js";
const puzzle = Deno.readTextFileSync("./2020/day_4/puzzle.txt");

const formatePassportDetail = (fields) => {
  return fields.reduce((passport, field) => {
    const [key, value] = field.split(":");
    passport[key] = value;
    return passport;
  }, {});
};
const parsePassports = (passports) => {
  const passportsData = passports
    .split("\n\n")
    .map((fields) => fields.split("\n").join(" ").split(" "));

  return passportsData.map(formatePassportDetail);
};
const fieldsToValidate = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
];
const allFieldsPresent = (passport) => {
  return fieldsToValidate
    .every((field) => field in passport);
};

const validateHeight = (height = "") => {
  console.log({ height });

  const x = parseInt(height.slice(0, -2));
  if (height.slice(-2) === "cm") {
    return x >= 150 && x <= 193;
  }
  if (height.slice(-2) === "in") {
    return x >= 59 && x <= 76;
  }
  return false;
};

const isValidHair = (value = "") => {
  const hex = /^#[\da-f]{6}$/;
  return hex.test(value);
};
const EYE_COLORS = [
  "amb",
  "blu",
  "brn",
  "gry",
  "grn",
  "hzl",
  "oth",
];
const isValidEyeColor = (value) => {
  return EYE_COLORS.includes(value);
};

const isValidPID = (value) => {
  const pid = /^\d{9}$/;
  return pid.test(value);
};

const validateFields = (passport) => {
  const isValidBYR = passport.byr >= 1920 && passport.byr <= 2002;
  const isValidIYR = passport.iyr >= 2010 && passport.iyr <= 2020;
  const isValidEYR = passport.eyr >= 2020 && passport.eyr <= 2030;

  const isValidHGT = validateHeight(passport.hgt);

  const isValidHCL = isValidHair(passport.hcl);
  const ValidPID = isValidPID(passport.pid);
  const isValidECL = isValidEyeColor(passport.ecl);

  return isValidBYR && isValidIYR && isValidHGT &&
    isValidEYR && isValidHCL && ValidPID && isValidECL;
};

const count = parsePassports(puzzle).reduce((count, current) => {
  return allFieldsPresent(current) && validateFields(current)
    ? count + 1
    : count;
}, 0);

console.log({ count });

// const [one, two, three, four] = parsePassports(passports);
// console.log(
//   // { one /* , two, three, four */ },
//   allFieldsPresent(one),
//   validateFields(one),
// );
