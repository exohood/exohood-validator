import * as helpers from "../helpers";

export const moonpayRules = {
    required: {
      message: "The :attribute field is required.",
      validate: (val: any) => !helpers.isBlank(val),
    },
    email: {
      message: "The :attribute must be a valid email address.",
      validate: (val: any) => helpers.testRegex(val,/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
    }
  }
