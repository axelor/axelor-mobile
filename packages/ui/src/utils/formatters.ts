import {checkNullString, splitInTwo} from './strings';

export function formatDate(inputDate: string, format: string): string {
  // Format must contains three parts : MM for the month, DD for the day and YYYY for the year
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  format = format.replace('MM', month.toString().padStart(2, '0'));
  format = format.replace('YYYY', year.toString());
  format = format.replace('DD', day.toString().padStart(2, '0'));

  return format;
}

export function formatNumber(
  number: string,
  decimalSpacer: string = '.',
  thousandSpacer: string = ' ',
): string {
  if (checkNullString(number)) {
    return `0${decimalSpacer}00`;
  }

  number = parseFloat(number).toFixed(2);

  const decimalPart = splitInTwo(number)[1];
  const integerPart = splitInTwo(number)[0];

  let result = '';
  let counter = 0;

  for (var i = integerPart.length - 1; i >= 0; i--) {
    result =
      counter !== 0 && counter % 3 === 0
        ? integerPart[i] + thousandSpacer + result
        : integerPart[i] + result;
    counter++;
  }

  return `${result}${decimalSpacer}${decimalPart ? decimalPart : '00'}`;
}
