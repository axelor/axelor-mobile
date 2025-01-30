/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {stringNoAccent} from '@axelor/aos-mobile-core';

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
