export function formatURL(url: String): String {
  if (url.slice(-1) === '/') {
    return url;
  }

  return url + '/';
}
