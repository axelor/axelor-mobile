import {stringNoAccent} from '@aos-mobile/core';

export const filterItemByStockMoveSeq = (item, name) => {
  return item.stockMoveSeq.toLowerCase().includes(name.toLowerCase());
};

export const filterInventoryByRef = (item, name) => {
  return item.inventorySeq.toLowerCase().includes(name.toLowerCase());
};

export const filterPartner = (item, searchValue) => {
  return (
    (item.fullName != null &&
      stringNoAccent(item?.fullName)
        .toLowerCase()
        .includes(stringNoAccent(searchValue).toLowerCase())) ||
    (item?.partnerSeq != null &&
      stringNoAccent(item?.partnerSeq)
        .toLowerCase()
        .includes(stringNoAccent(searchValue).toLowerCase())) ||
    (item?.name != null &&
      stringNoAccent(item?.name)
        .toLowerCase()
        .includes(stringNoAccent(searchValue).toLowerCase())) ||
    (item?.firstName != null &&
      stringNoAccent(item?.firstName)
        .toLowerCase()
        .includes(stringNoAccent(searchValue).toLowerCase())) ||
    (item?.simpleFullName != null &&
      stringNoAccent(item?.simpleFullName)
        .toLowerCase()
        .includes(stringNoAccent(searchValue).toLowerCase()))
  );
};

export const filterProduct = (item, searchValue) => {
  return (
    stringNoAccent(item?.name)
      .toLowerCase()
      .includes(stringNoAccent(searchValue).toLowerCase()) ||
    stringNoAccent(item?.code)
      .toLowerCase()
      .includes(stringNoAccent(searchValue).toLowerCase()) ||
    (item?.serialNumber != null &&
      stringNoAccent(item?.serialNumber)
        .toLowerCase()
        .includes(stringNoAccent(searchValue).toLowerCase()))
  );
};

export const filterStockLocation = (item, searchValue) => {
  return (
    stringNoAccent(item?.name)
      .toLowerCase()
      .includes(stringNoAccent(searchValue).toLowerCase()) ||
    (item?.serialNumber != null &&
      stringNoAccent(item?.serialNumber)
        .toLowerCase()
        .includes(stringNoAccent(searchValue).toLowerCase()))
  );
};

export const filterTrackingNumber = (item, searchValue) => {
  return (
    stringNoAccent(item?.trackingNumberSeq)
      .toLowerCase()
      .includes(stringNoAccent(searchValue).toLowerCase()) ||
    (item?.serialNumber != null &&
      stringNoAccent(item?.serialNumber)
        .toLowerCase()
        .includes(stringNoAccent(searchValue).toLowerCase()))
  );
};
