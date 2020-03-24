export const stringify = (obj: object, indent = 2): string => {
  return JSON.stringify(obj, null, indent);
};
