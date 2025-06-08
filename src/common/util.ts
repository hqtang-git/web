const isEmpty = (value) => value === '' || value === null || value === undefined;

export const formatNil = (value) => {
  return isEmpty(value) ? '-' : value;
}