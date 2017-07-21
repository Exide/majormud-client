export const stringExists = (string) => {
  let isNotUndefined = string !== undefined;
  let isTypeString = typeof string === 'string';
  return isNotUndefined && isTypeString;
};
