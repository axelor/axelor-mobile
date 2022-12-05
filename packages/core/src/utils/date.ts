import moment from 'moment';

export const isDate = (date: string): boolean => {
  return moment(date, moment.ISO_8601, true).isValid();
};

export const isDateTime = (date: string): boolean => {
  return isDate(date) && date?.length > 10;
};

export const getNextMonth = (date: Date): Date => {
  if (date.getMonth() === 11) {
    return new Date(date.getFullYear() + 1, 0, 1);
  } else {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
};

export const getPreviousMonth = (date: Date): Date => {
  if (date.getMonth() === 0) {
    return new Date(date.getFullYear() - 1, 11, 1);
  } else {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }
};
