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
  createStandardFetch,
  createStandardSearch,
  formatRequestBody,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createPurchaseRequestCriteria = ({searchValue, statusList, supplier}) => {
  const criterias = [
    getSearchCriterias('purchase_purchaseRequest', searchValue),
  ];

  if (supplier) {
    criterias.push({
      fieldName: 'supplierPartner.id',
      operator: '=',
      value: supplier.id,
    });
  }

  if (Array.isArray(statusList) && statusList.length > 0) {
    criterias.push({
      operator: 'or',
      criteria: statusList.map(status => ({
        fieldName: 'statusSelect',
        operator: '=',
        value: status.key,
      })),
    });
  }

  return criterias;
};

export async function searchPurchaseRequest({
  page = 0,
  searchValue,
  statusList,
  supplier,
  companyId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.purchase.db.PurchaseRequest',
    criteria: createPurchaseRequestCriteria({
      searchValue,
      statusList,
      supplier,
    }),
    fieldKey: 'purchase_purchaseRequest',
    sortKey: 'purchase_purchaseRequest',
    page,
    companyId,
    provider: 'model',
  });
}

export async function getPurchaseRequest({id}) {
  return createStandardFetch({
    model: 'com.axelor.apps.purchase.db.PurchaseRequest',
    id,
    fieldKey: 'purchase_purchaseRequest',
    provider: 'model',
  });
}

export async function updatePurchaseRequestStatus({purchaseRequest, status}) {
  return getActionApi().send({
    url: `ws/aos/purchase-request/${status}/${purchaseRequest.id}`,
    method: 'put',
    body: {
      version: purchaseRequest.version,
    },
    description: 'update purchase request status',
  });
}

export async function createPurchaseRequest({
  companyId,
  status,
  description,
  purchaseRequestLineList,
}) {
  return getActionApi().send({
    url: 'ws/aos/purchase-request/create',
    method: 'post',
    body: {
      companyId,
      status,
      description,
      purchaseRequestLineList,
    },
    description: 'create purchase request',
  });
}

export async function updatePurchaseRequest({purchaseRequest}) {
  const {matchers, formattedData} = formatRequestBody(purchaseRequest, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.purchase.db.PurchaseRequest',
    method: 'post',
    body: {data: formattedData},
    description: 'update purchase request',
    matchers: {
      modelName: 'com.axelor.apps.purchase.db.PurchaseRequest',
      id: purchaseRequest.id,
      fields: matchers,
    },
  });
}
