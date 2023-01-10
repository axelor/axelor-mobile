export const getLastEvent = listEvent => {
  const today = new Date();
  if (listEvent && listEvent.length > 0) {
    const filtredList = listEvent.filter(
      event => new Date(event.startDateTime) < today,
    );
    const getLatest = arr =>
      arr.sort(
        (a, b) => new Date(b.startDateTime) - new Date(a.startDateTime),
      )[0];
    return getLatest(filtredList);
  }
};

export const getNextEvent = listEvent => {
  const today = new Date();
  if (listEvent && listEvent.length > 0) {
    const filtredList = listEvent.filter(
      event => new Date(event.startDateTime) > today,
    );
    const getRecent = arr =>
      arr.sort(
        (a, b) => new Date(a.startDateTime) - new Date(b.startDateTime),
      )[0];
    return getRecent(filtredList);
  }
};
