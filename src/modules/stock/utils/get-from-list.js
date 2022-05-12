function getFromList(list, objectParam, query) {
  if (query === '') {
    return null;
  } else {
    for (let i = 0; i < list.length; i++) {
      if (list[i][objectParam] === query) {
        return list[i];
      }
    }
    return null;
  }
}

export default getFromList;
