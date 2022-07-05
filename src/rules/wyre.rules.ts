import * as helpers from "../helpers";
export const wyreRules = {
    required: {
      message: "The :attribute field is required.",
      validate: (val: any) => !helpers.isBlank(val),
    }
  }
