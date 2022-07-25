"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExohoodValidator = exports.ValidationStatus = exports.Gateway = void 0;
var rules_1 = require("./rules");
var helpers = __importStar(require("./helpers"));
var Gateway;
(function (Gateway) {
    Gateway["Default"] = "DEFAULT";
    Gateway["Moonpay"] = "MOONPAY";
    Gateway["Wyre"] = "WYRE";
})(Gateway = exports.Gateway || (exports.Gateway = {}));
var ValidationStatus;
(function (ValidationStatus) {
    ValidationStatus[ValidationStatus["VALID"] = 0] = "VALID";
    ValidationStatus[ValidationStatus["INVALID"] = 1] = "INVALID";
    ValidationStatus[ValidationStatus["NOT_AVAILABLE"] = 2] = "NOT_AVAILABLE";
})(ValidationStatus = exports.ValidationStatus || (exports.ValidationStatus = {}));
var ExohoodValidator = (function () {
    function ExohoodValidator(options) {
        var _this = this;
        this.showMessageFor = function (field) {
            if (!_this.visibleFields.includes(field)) {
                _this.visibleFields.push(field);
            }
        };
        this.hideMessageFor = function (field) {
            var index = _this.visibleFields.indexOf(field);
            if (index > -1) {
                _this.visibleFields.splice(index, 1);
            }
        };
        this.fields = {};
        this.errorMessages = {};
        this.rules = rules_1.rules;
        this.visibleFields = [];
        this.className = options === null || options === void 0 ? void 0 : options.className;
        this.messagesShown = false;
        this.element = function (message) { return message; };
    }
    ExohoodValidator.prototype.getErrorMessages = function () {
        return this.errorMessages;
    };
    ExohoodValidator.prototype.purgeFields = function () {
        this.fields = {};
        this.errorMessages = {};
    };
    ExohoodValidator.prototype.showMessages = function () {
        this.messagesShown = true;
    };
    ExohoodValidator.prototype.hideMessages = function () {
        this.messagesShown = false;
    };
    ExohoodValidator.prototype.allValid = function () {
        for (var key in this.fields) {
            if (this.fieldValid(key) === false) {
                return false;
            }
        }
        return true;
    };
    ExohoodValidator.prototype.fieldValid = function (field) {
        return (this.visibleFields.includes(field) &&
            this.fields.hasOwnProperty(field) &&
            this.fields[field] === true);
    };
    ExohoodValidator.prototype.message = function (field, inputValue, gateway) {
        var rules = gateway
            ? __assign(__assign({}, this.rules.DEFAULT), this.rules[gateway]) : this.rules.DEFAULT;
        this.fields[field] = true;
        var element;
        if (rules &&
            this.checkValidity(field, inputValue, rules) === ValidationStatus.INVALID) {
            element = this.element(helpers.modifyMessage(field, rules[field].message));
            this.fields[field] = false;
        }
        else {
            return;
        }
        if (this.messagesShown || this.visibleFields.includes(field))
            return element;
    };
    ExohoodValidator.prototype.validateAll = function (data, gateway) {
        var rules = gateway
            ? __assign(__assign({}, this.rules.DEFAULT), this.rules[gateway]) : this.rules.DEFAULT;
        for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            var validStatus = this.checkValidity(key, value, rules);
            var message = void 0;
            switch (validStatus) {
                case ValidationStatus.INVALID:
                    message = this.element(helpers.modifyMessage(key, rules === null || rules === void 0 ? void 0 : rules[key].message));
                    this.errorMessages[key] = message;
                    break;
            }
        }
    };
    ExohoodValidator.prototype.checkValidity = function (field, inputValue, rules) {
        if (rules === null || rules === void 0 ? void 0 : rules.hasOwnProperty(field))
            if (!helpers.isBlank(inputValue) && rules[field].validate(inputValue))
                return ValidationStatus.VALID;
            else
                return ValidationStatus.INVALID;
        return ValidationStatus.NOT_AVAILABLE;
    };
    return ExohoodValidator;
}());
exports.ExohoodValidator = ExohoodValidator;
//# sourceMappingURL=ExohoodValidator.js.map
