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
  filterDomain,
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
    filter: filterDomain,
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
  const body = {
    version: purchaseRequest.version,
  };
  const {formattedData, matchers} = formatRequestBody(body);

  return getActionApi().send({
    url: `ws/aos/purchase-request/${status}/${purchaseRequest.id}`,
    method: 'put',
    body: formattedData,
    description: 'update purchase request status',
    matchers: {
      modelName: 'com.axelor.apps.purchase.db.PurchaseRequest',
      id: purchaseRequest.id,
      fields: matchers,
    },
  });
}

export async function createPurchaseRequest({
  companyId,
  status,
  description,
  purchaseRequestLineList,
}) {
  const requestBody = {
    companyId,
    status,
    description,
  };
  const {formattedData, matchers} = formatRequestBody(requestBody);

  return getActionApi().send({
    url: 'ws/aos/purchase-request/create',
    method: 'post',
    body: {
      ...formattedData,
      purchaseRequestLineList,
    },
    description: 'create purchase request',
    matchers: {
      modelName: 'com.axelor.apps.purchase.db.PurchaseRequest',
      id: Date.now(),
      fields: {
        ...matchers,
        purchaseRequestLineList: 'purchaseRequestLineList',
      },
    },
  });
}

export async function updatePurchaseRequest({purchaseRequest}) {
  const body = {
    id: purchaseRequest.id,
    version: purchaseRequest.version,
    description: purchaseRequest.description,
  };
  const {matchers, formattedData} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.purchase.db.PurchaseRequest',
    method: 'post',
    body: {
      data: formattedData,
    },
    description: 'update purchase request',
    matchers: {
      modelName: 'com.axelor.apps.purchase.db.PurchaseRequest',
      id: purchaseRequest.id,
      fields: matchers,
    },
  });
}
