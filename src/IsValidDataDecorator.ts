import { ExohoodValidator } from "./ExohoodValidator";

export function isValidData(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log("param decorator function invoked ");
  Validator.registerNotNull(target, propertyKey, parameterIndex);
}

export function validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("method decorator validate function invoked ");
  let originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (!Validator.performValidation(target, propertyKey, args)) {
      throw new Error("Parameters are not valid.");
    }
    let result = originalMethod.apply(this, args);
    return result;
  };
}

class Validator {
  private static notNullValidatorMap: Map<any, Map<string, number[]>> =
    new Map();

  static registerNotNull(
    target: any,
    methodName: string,
    paramIndex: number
  ): void {
    let paramMap: Map<string, number[]> | undefined =
      this.notNullValidatorMap.get(target);
    if (!paramMap) {
      paramMap = new Map();
      this.notNullValidatorMap.set(target, paramMap);
    }
    let paramIndexes: number[] | undefined = paramMap.get(methodName);
    if (!paramIndexes) {
      paramIndexes = [];
      paramMap.set(methodName, paramIndexes);
    }
    paramIndexes.push(paramIndex);
  }

  static performValidation(
    target: any,
    methodName: string,
    paramValues: any[]
  ): boolean {
    let notNullMethodMap: Map<string, number[]> | undefined =
      this.notNullValidatorMap.get(target);
    if (!notNullMethodMap) {
      return true;
    }
    let paramIndexes: number[] | undefined = notNullMethodMap.get(methodName);
    if (!paramIndexes) {
      return true;
    }
    let hasErrors: boolean = false;
    if (paramValues?.[0]) {
      const validator = new ExohoodValidator();
      validator.validateAll(paramValues[0]);
      const errors = validator.getErrorMessages();
      if (Object.keys(errors).length !== 0) hasErrors = true;
    }
    return !hasErrors;
  }
}
