import { ExohoodValidator, isValidData, validate, Gateway } from "../src";
const validator = new ExohoodValidator();
console.log(validator.message("firstName", "Chamith1"));
