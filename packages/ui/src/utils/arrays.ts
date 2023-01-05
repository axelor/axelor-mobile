export const replace = (
  arr: any[],
  oldValue: any,
  newValue: any,
  key: string,
): any[] => {
  const idx = indexOfElement(arr, oldValue, key);
  if (idx >= 0) {
    arr.splice(idx, 1, newValue);
  }

  return arr;
};

export const indexOfElement = (
  arr: any[],
  element: any,
  key: string,
): number => {
  if (arr == null) {
    return null;
  }
  return arr.findIndex(item => item?.[key] === element?.[key]);
};
