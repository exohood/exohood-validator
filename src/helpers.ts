export function testRegex(value: any, regex: any) {
  return value.toString().match(regex) !== null;
}

export function isBlank(value: string) {
  return (
    typeof value === "undefined" ||
    value === null ||
    testRegex(value, /^[\s]*$/)
  );
}

export function humanizeFieldName(field: string) {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .toLowerCase();
}

export function modifyMessage(field: string, message: string) {
  return message.replace(":attribute", humanizeFieldName(field));
}
