function filterListContain(list, subListObject, objectParam, query) {
  if (query === '') {
    return list;
  } else {
    const filteredList = [];
    list.forEach(item => {
      if (subListContain(item[subListObject], objectParam, query)) {
        filteredList.push(item);
      }
    });
    return filteredList;
  }
}

function subListContain(subList, objectParam, query) {
  if (query === '') {
    return false;
  } else {
    for (let i = 0; i < subList.length; i++) {
      if (subList[i][objectParam] === query) {
        return true;
      }
    }
    return false;
  }
}

export default filterListContain;
