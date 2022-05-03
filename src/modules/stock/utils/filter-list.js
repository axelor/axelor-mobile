function filterList(list, subObject, objectParam, query) {
  if (query === '') {
    return list;
  } else {
    const filteredList = [];
    list.forEach(item => {
      if (item[subObject][objectParam] === query) {
        filteredList.push(item);
      }
    });
    return filteredList;
  }
}

export default filterList;
