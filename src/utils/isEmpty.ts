export const isEmpty = (value: unknown) =>
  !value || (Array.isArray(value) && value.length === 0);
