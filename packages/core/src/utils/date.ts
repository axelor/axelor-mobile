import moment from 'moment';

export const isDate = (date: string): boolean => {
  return moment(date, moment.ISO_8601, true).isValid();
};

export const isDateTime = (date: string): boolean => {
  return isDate(date) && date?.length > 10;
};
