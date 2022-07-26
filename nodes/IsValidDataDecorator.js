"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.isValidData = void 0;
var OnramperValidator_1 = require("./OnramperValidator");
function isValidData(target, propertyKey, parameterIndex) {
    Validator.registerNotNull(target, propertyKey, parameterIndex);
}
exports.isValidData = isValidData;
function validate(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var errors = Validator.performValidation(target, propertyKey, args);
        if (typeof errors === "object") {
            throw new Error(JSON.stringify(errors));
        }
        var result = originalMethod.apply(this, args);
        return result;
    };
}
exports.validate = validate;
var Validator = (function () {
    function Validator() {
    }
    Validator.registerNotNull = function (target, methodName, paramIndex) {
        var paramMap = this.notNullValidatorMap.get(target);
        if (!paramMap) {
            paramMap = new Map();
            this.notNullValidatorMap.set(target, paramMap);
        }
        var paramIndexes = paramMap.get(methodName);
        if (!paramIndexes) {
            paramIndexes = [];
            paramMap.set(methodName, paramIndexes);
        }
        paramIndexes.push(paramIndex);
    };
    Validator.performValidation = function (target, methodName, paramValues) {
        var notNullMethodMap = this.notNullValidatorMap.get(target);
        if (!notNullMethodMap) {
            return true;
        }
        var paramIndexes = notNullMethodMap.get(methodName);
        if (!paramIndexes) {
            return true;
        }
        var hasErrors = false;
        if (paramValues === null || paramValues === void 0 ? void 0 : paramValues[0]) {
            var validator = new OnramperValidator_1.OnramperValidator();
            validator.validateAll(paramValues[0]);
            var errors = validator.getErrorMessages();
            if (Object.keys(errors).length !== 0)
                return errors;
        }
        return !hasErrors;
    };
    Validator.notNullValidatorMap = new Map();
    return Validator;
}());
//# sourceMappingURL=IsValidDataDecorator.js.map
