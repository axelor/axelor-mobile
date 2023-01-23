export function getFromList(list: any[], objectParam: string, query: any) {
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

export function getItemsFromList(
  list: any[],
  objectParam: string,
  query: any[],
) {
  if (query == null || query.length === 0) {
    return [];
  } else {
    let newItemsList = [];

    for (let i = 0; i < list.length; i++) {
      query.forEach(item => {
        if (list[i][objectParam] === item) {
          newItemsList.push(list[i]);
        }
      });
    }
    return newItemsList;
  }
}
