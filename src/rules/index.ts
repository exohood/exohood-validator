import { IRules } from "../ExohoodValidator";
import { defaultRules } from "./default.rules";
import { moonpayRules } from "./moonpay.rules";
import { wyreRules } from "./wyre.rules";
export const rules: IRules = {
  DEFAULT: defaultRules,
  WYRE: wyreRules,
  MOONPAY: moonpayRules,
};
