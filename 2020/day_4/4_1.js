import { passports } from "./passports.js";

const parsePassports = (passports) => {
  return passports
    .split("\n\n")
    .map((fields) => fields.split("\n").join(" "));
};

const generatePassport = (fields) => {
  return fields.split(" ").reduce((passport, field) => {
    const [key, value] = field.split(":");
    passport[key] = value;
    return passport;
  }, {});
};

const generatePassports = (passports) => {
  return parsePassports(passports).map(generatePassport);
};

const passportsFormatted = generatePassports(passports);

console.log(passportsFormatted);
