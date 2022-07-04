import * as helpers from "../helpers";

export const defaultRules = {
    required: {
      message: "The :attribute field is required.",
      validate: (val: any) => !helpers.isBlank(val),
    },
    email: {
      message: "The :attribute must be a valid email address.",
      validate: (val: any) => helpers.testRegex(val,/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
    },
    firstName: {
      message: "The :attribute must be a string.",
      validate: (val: any) => typeof val === typeof "string",
    },
    lastName: {
      message: "The :attribute must be a string.",
      validate: (val: any) => typeof val === typeof "string",
    },
    currency: {
      message: "The :attribute must be a valid currency.",
      validate: (val: any) => helpers.testRegex(val, /^[\$£€¥]?(\d{1,3})(\,?\d{3})*\.?\d{0,2}$/),
    },
    phoneNumber: {
      message: "The :attribute must be a valid phone number.",
      validate: (val: any) => helpers.testRegex(val, /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/) && !helpers.testRegex(val, /^\b(\d)\1{8,}\b$/),
    },
    card_exp: {
      message: "The :attribute must be a valid expiration date.",
      validate: (val: any) => helpers.testRegex(val, /^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?(\d{2}|\d{4})$/),
    },
    card_num: {
      message: "The :attribute must be a valid credit card number.",
      validate: (val: any) =>
        helpers.testRegex(val, /^\d{4}\s?\d{4,6}\s?\d{4,5}\s?\d{0,8}$/),
    },
  }
