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

import {
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createPurchaseRequestLineCriteria = ({
  searchValue,
  purchaseRequestId,
  newProduct,
}) => {
  const criterias = [
    getSearchCriterias('purchase_purchaseRequestLine', searchValue),
    {
      fieldName: 'purchaseRequest.id',
      operator: '=',
      value: purchaseRequestId,
    },
  ];

  if (newProduct != null) {
    criterias.push({
      fieldName: 'newProduct',
      operator: '=',
      value: newProduct,
    });
  }

  return criterias;
};

export async function searchPurchaseRequestLine({
  page = 0,
  searchValue,
  purchaseRequestId,
  newProduct,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.purchase.db.PurchaseRequestLine',
    criteria: createPurchaseRequestLineCriteria({
      searchValue,
      purchaseRequestId,
      newProduct,
    }),
    fieldKey: 'purchase_purchaseRequestLine',
    sortKey: 'purchase_purchaseRequestLine',
    page,
  });
}
