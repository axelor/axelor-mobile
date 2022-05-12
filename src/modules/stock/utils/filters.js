export const filterItemByName = (item, name) => {
  return item.name.toLowerCase().includes(name.toLowerCase());
};

export const filterItemByTrackingNumberSeq = (item, trackingNumberSeq) => {
  return item.trackingNumberSeq
    .toLowerCase()
    .includes(trackingNumberSeq.toLowerCase());
};
