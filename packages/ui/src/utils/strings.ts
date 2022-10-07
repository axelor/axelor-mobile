export function splitInTwo(value: string, spacer = '.'): Array<string> {
  if (value == null) {
    return null;
  }
  return value.toString().split(spacer);
}

export function checkNullString(message) {
  if (message == null) {
    return true;
  } else {
    let newMessage = message.replace(/\s/g, '');
    return newMessage == null || newMessage === '';
  }
}
