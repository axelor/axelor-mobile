export function formatDate(inputDate, format) {
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

export const formatDateTime = (dateTime, format) => {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  format = formatDate(dateTime, format);
  format = format.replace('HH', hours.toString().padStart(2, '0'));
  format = format.replace('mm', minutes.toString().padStart(2, '0'));

  return format;
};

export function formatScan(barcodeValue, barcodeType, config = true) {
  if (config && barcodeType != null && barcodeValue != null) {
    if (
      barcodeType === 'EAN_13' ||
      barcodeType === 'EAN_8' ||
      barcodeType === 'UPC_A'
    ) {
      return barcodeValue.slice(0, -1);
    } else {
      return barcodeValue;
    }
  } else {
    return barcodeValue;
  }
}
