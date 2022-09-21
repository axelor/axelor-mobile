export function formatURL(url: String): String {
  if (url.slice(-1) === '/') {
    return url;
  }

  return url + '/';
}

export function splitInTwo(value: String, spacer = '.'): Array<String> {
  if (value == null) {
    return null;
  }
  return value.toString().split(spacer);
}
