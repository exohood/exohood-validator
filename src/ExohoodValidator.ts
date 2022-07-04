import { rules } from "./rules";
import React from "react";
import * as helpers from "./helpers";

export enum Gateway {
  Default = "DEFAULT",
  Moonpay = "MOONPAY",
  Wyre = "WYRE",
}

export enum ValidationStatus {
  VALID,
  INVALID,
  NOT_AVAILABLE,
}

export interface IRule {
  message: string;
  validate: (val: any, params?: any) => boolean;
}

export type IRules = {
  [gateway in Gateway]: {
    [rule: string]: IRule;
  };
};

export class ExohoodValidator {
  fields: any;
  errorMessages: any;
  rules: IRules;
  element: any;
  visibleFields: any;
  messagesShown: boolean;
  className: string;

  constructor(options?: any) {
    this.fields = {};
    this.errorMessages = {};
    this.rules = rules;
    this.visibleFields = [];
    this.className = options?.className;
    this.messagesShown = false;

    if (typeof navigator === "object") {
      this.element = (message: any, className: any) =>
        React.createElement(
          "div",
          {
            className: className || options.className || "validation-message",
          },
          message
        );
    } else {
      this.element = (message: any) => message;
    }
  }

  getErrorMessages() {
    return this.errorMessages;
  }

  purgeFields() {
    this.fields = {};
    this.errorMessages = {};
  }

  showMessages() {
    this.messagesShown = true;
  }

  showMessageFor = (field: string) => {
    if (!this.visibleFields.includes(field)) {
      this.visibleFields.push(field);
    }
  };

  hideMessageFor = (field: string) => {
    const index = this.visibleFields.indexOf(field);
    if (index > -1) {
      this.visibleFields.splice(index, 1);
    }
  };

  hideMessages() {
    this.messagesShown = false;
  }

  validateField(field: any, inputValue: any, gateway?: Gateway) {
    const rules = gateway
      ? { ...this.rules.DEFAULT, ...this.rules[gateway!] }
      : this.rules.DEFAULT;

    this.fields[field] = true;
    let element;

    if (
      rules &&
      this.checkValidity(field, inputValue, rules) === ValidationStatus.INVALID
    ) {
      element = this.element(
        helpers.modifyMessage(field, rules[field].message)
      );
      this.fields[field] = false;
    } else {
      return;
    }
    if (this.messagesShown || this.visibleFields.includes(field))
      return element;
  }

  validateAll(data: any, gateway?: Gateway) {
    const rules = gateway
      ? { ...this.rules.DEFAULT, ...this.rules[gateway] }
      : this.rules.DEFAULT;

    for (const [key, value] of Object.entries(data)) {
      const validStatus = this.checkValidity(key, value, rules);
      let message;

      switch (validStatus) {
        case ValidationStatus.INVALID:
          message = this.element(
            helpers.modifyMessage(key, rules?.[key].message)
          );
          this.errorMessages[key] = message;
          break;
        // case ValidationStatus.VALID:
        //   message = "Valid";
        //   break;
        // case ValidationStatus.NOT_AVAILABLE:
        //   message = "Not available";
        //   break;
        // default:
        //   break;
      }
    }
  }

  private checkValidity(field: string, inputValue: any, rules: any) {
    if (rules?.hasOwnProperty(field))
      if (rules[field].validate(inputValue)) return ValidationStatus.VALID;
      else return ValidationStatus.INVALID;
    return ValidationStatus.NOT_AVAILABLE;
  }
}
