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
