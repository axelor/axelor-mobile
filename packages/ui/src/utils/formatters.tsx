export function formatDate(inputDate: string, format: string) {
  // Format must contains three parts : MM for the month, DD for the day and YYYY for the year
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  format = format.replace("MM", month.toString().padStart(2, "0"));
  format = format.replace("YYYY", year.toString());
  format = format.replace("DD", day.toString().padStart(2, "0"));

  return format;
}
