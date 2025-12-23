import { passports } from "./passports.js";
// const puzzle = Deno.readTextFileSync("./2020/day_4/puzzle.txt");

const parsePassports = (passports) => {
  return passports
    .split("\n\n")
    .map((fields) => fields.split("\n").join(" "));
};

const genOnePassport = (fields) => {
  return fields.split(" ").reduce((passport, field) => {
    const [key, value] = field.split(":");
    passport[key] = value;
    return passport;
  }, {});
};

const generatePassports = (passports) => {
  return parsePassports(passports).map(genOnePassport);
};

const fieldsToValidate = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  // "cid",
];

const allFieldsPresent = (passport) => {
  return fieldsToValidate
    .every((field) => field in passport);
};

const [one, two, three, four] = generatePassports(passports);
console.log({ one }, allFieldsPresent(one));
