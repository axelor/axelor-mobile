export const isHalf = (value: number): boolean => {
  return value - Math.floor(value) > 0;
};

export const getIntegerPart = (value: number): number => {
  return Math.floor(value);
};

export const roundHalf = (value: number): number => {
  const inv = 1.0 / 0.5;
  return Math.round(value * inv) / inv;
};

export const roundInteger = (value: number): number => {
  if (value <= Math.floor(value) + 0.5) {
    return Math.floor(value);
  }
  return Math.floor(value) + 1;
};
