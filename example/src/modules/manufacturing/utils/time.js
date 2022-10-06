import {formatDate} from '@/modules/stock/utils/formatters';

const NB_SECOND_IN_MINUTES = 60;
const NB_MINUTES_IN_HOURS = 60;
const NB_HOURS_IN_DAYS = 24;

export const formatTwoNumber = value => {
  if (value == null || value === 0) {
    return '00';
  } else if (value < 10) {
    return `0${value}`;
  } else {
    return `${value}`;
  }
};

export const getIntegerPart = value => {
  if (value < 1) {
    return formatTwoNumber(0);
  }
  const integerPart = parseFloat(value.toString().split('.')[0]);
  return formatTwoNumber(integerPart);
};

export const formatDuration = (secondsValue, format = 'hh:mm:ss') => {
  if (format === 'hh:mm:ss') {
    const hours = secondsValue / (NB_SECOND_IN_MINUTES * NB_MINUTES_IN_HOURS);
    const minutes = (hours % 1) * NB_MINUTES_IN_HOURS;
    const seconds = (minutes % 1) * NB_SECOND_IN_MINUTES;

    return `${getIntegerPart(hours)}:${getIntegerPart(
      minutes,
    )}:${getIntegerPart(seconds)}`;
  } else if (format === 'dd:hh:mm:ss') {
    const days =
      secondsValue /
      (NB_SECOND_IN_MINUTES * NB_MINUTES_IN_HOURS * NB_HOURS_IN_DAYS);
    const hours = (days % 1) * NB_HOURS_IN_DAYS;
    const minutes = (hours % 1) * NB_MINUTES_IN_HOURS;
    const seconds = (minutes % 1) * NB_SECOND_IN_MINUTES;

    return `${getIntegerPart(days)}:${getIntegerPart(hours)}:${getIntegerPart(
      minutes,
    )}:${getIntegerPart(seconds)}`;
  }
};

export const formatDateTime = (dateTime, format = 'DD/MM/YYYY HH:mm') => {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  format = formatDate(dateTime, format);
  format = format.replace('HH', hours.toString().padStart(2, '0'));
  format = format.replace('mm', minutes.toString().padStart(2, '0'));

  return format;
};
