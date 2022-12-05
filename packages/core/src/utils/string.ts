export function splitInTwo(value: String, spacer = '.'): Array<String> {
  if (value == null) {
    return null;
  }
  return value.toString().split(spacer);
}

export function isHtml(value: string): boolean {
  const regex = /<\/?[a-z][\s\S]*>/i;
  if (value == null) {
    return null;
  }
  return regex.test(value);
}

export function stringNoAccent(message) {
  if (message == null) {
    return null;
  } else {
    const b = 'áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ';
    const c = 'aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY';
    let newMessage = message;
    for (let i = 0; i < b.length; i++) {
      newMessage = newMessage.replace(b.charAt(i), c.charAt(i));
    }
    return newMessage;
  }
}

export function checkNullString(message) {
  if (message == null) {
    return message;
  } else {
    let newMessage = message.replace(/\s/g, '');
    return newMessage == null || newMessage === '';
  }
}
