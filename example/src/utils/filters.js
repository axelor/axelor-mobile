export function filterList(list, objectParam, query) {
  if (query === '' || query == null) {
    return list;
  } else {
    if (list == null || list === []) {
      return list;
    } else {
      const filteredList = [];
      list.forEach(item => {
        if (
          item[objectParam] === query ||
          item[objectParam]?.indexOf(query) !== -1
        ) {
          filteredList.push(item);
        }
      });
      return filteredList;
    }
  }
}
