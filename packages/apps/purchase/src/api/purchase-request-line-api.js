/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
  createStandardFetch,
  createStandardSearch,
  formatRequestBody,
  getActionApi,
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
    provider: 'model',
  });
}

export async function fetchPurchaseRequestLine({id}) {
  return createStandardFetch({
    model: 'com.axelor.apps.purchase.db.PurchaseRequestLine',
    id,
    fieldKey: 'purchase_purchaseRequestLine',
    provider: 'model',
  });
}

export async function createPurchaseRequestLine({
  purchaseRequestId,
  purchaseRequestVersion,
  purchaseRequestLine,
}) {
  return getActionApi().send({
    url: `ws/aos/purchase-request/add-line/${purchaseRequestId}`,
    method: 'put',
    body: {
      version: purchaseRequestVersion,
      productId: purchaseRequestLine.product?.id,
      productTitle: purchaseRequestLine.productTitle,
      unitId: purchaseRequestLine.unit?.id,
      quantity: purchaseRequestLine.quantity,
    },
    description: 'create purchase request line',
    matchers: {
      modelName: 'com.axelor.apps.purchase.db.PurchaseRequestLine',
      id: Date.now(),
      fields: {
        productId: 'product.id',
        unitId: 'unit.id',
      },
    },
  });
}

export async function updatePurchaseRequestLine({purchaseRequestLine}) {
  const {matchers, formattedData} = formatRequestBody(
    {...purchaseRequestLine, newProduct: purchaseRequestLine.product == null},
    'data',
  );

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.purchase.db.PurchaseRequestLine',
    method: 'post',
    body: {data: formattedData},
    description: 'update purchase request line',
    matchers: {
      modelName: 'com.axelor.apps.purchase.db.PurchaseRequestLine',
      id: purchaseRequestLine.id,
      fields: matchers,
    },
  });
}
