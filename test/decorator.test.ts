import { ExohoodValidator, isValidData, validate, Gateway } from "../src";

const wyreData = {
  cryptocurrencyAddress: "rwt65q8et5q8etqtqwtqetqe",
  firstName: "sample",
  lastName: "sample",
  email: "sample@example.com",
  phoneCountryCode: 1,
  // phoneNumber: 123456789,
  // street: "Test street",
  // town: "Test town",
  // postCode: "123456",
  // country: "nl",
  // state: "undefined",
  ccNumber: "123456789",
  ccMonth: "12",
  ccYear: "2043",
  //   ccCVV: "123",
  termsOfUse: true,
};

class DecoratorTest {
  @validate
  controllerMethod(@isValidData data: any) {
    console.log("Running method logic");
  }
}

const decorator = new DecoratorTest();
decorator.controllerMethod(wyreData);
