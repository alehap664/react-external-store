export const clone = <T extends Record<string, any>>(object: T): T => {
  const obj: any = {};

  Object.keys(object).forEach((key) => {
    if (Array.isArray(object[key])) {
      obj[key] = object[key].slice();
    } else if (typeof object[key] === "object") {
      obj[key] = clone(object[key]);
    } else {
      obj[key] = object[key];
    }
  });
  return obj;
};
