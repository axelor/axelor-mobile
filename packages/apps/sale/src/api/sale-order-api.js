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
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';
import {mapStatusToAPIValue} from '../utils';

const createSaleOrderCriteria = (searchValue, statusList, customerId) => {
  const criteria = [getSearchCriterias('sale_saleOrder', searchValue)];

  if (Array.isArray(statusList) && statusList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: statusList.map(status => ({
        fieldName: 'statusSelect',
        operator: '=',
        value: status,
      })),
    });
  }

  if (customerId != null) {
    criteria.push({
      fieldName: 'clientPartner.id',
      operator: '=',
      value: customerId,
    });
  }

  return criteria;
};

export async function fetchSaleOrder({
  searchValue,
  statusList,
  customerId,
  page = 0,
  companyId,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.sale.db.SaleOrder',
    criteria: createSaleOrderCriteria(searchValue, statusList, customerId),
    fieldKey: 'sale_saleOrder',
    sortKey: 'sale_saleOrder',
    page,
    provider: 'model',
    companyId,
    filter: filterDomain,
  });
}

export async function fetchSaleOrderById({saleOrderId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.sale.db.SaleOrder',
    id: saleOrderId,
    fieldKey: 'sale_saleOrder',
    provider: 'model',
  });
}

export async function updateSaleOrderStatus({
  saleOrderId,
  saleOrderVersion,
  status,
}) {
  return getActionApi().send({
    url: `/ws/aos/sale-order/status/${saleOrderId}`,
    method: 'put',
    body: {
      version: saleOrderVersion,
      toStatus: mapStatusToAPIValue(status),
    },
    description: 'Update Sale Order Status',
    matchers: {
      modelName: 'com.axelor.apps.sale.db.SaleOrder',
      id: saleOrderId,
      fields: {
        version: 'version',
        toStatus: 'statusSelect',
      },
    },
  });
}

export async function createSaleOrder({
  saleOrderLineList,
  customerId,
  deliveredPartnerId,
  paymentModeId,
  paymentConditionId,
}) {
  const body = {
    saleOrderLineList,
    clientPartnerId: customerId,
    deliveredPartnerId,
    paymentModeId,
    paymentConditionId,
  };

  const fields = {
    saleOrderLineList: 'saleOrderLineList',
    clientPartnerId: 'clientPartner.id',
    deliveredPartnerId: 'deliveredPartner.id',
    paymentModeId: 'paymentMode.id',
    paymentConditionId: 'paymentCondition.id',
  };

  return getActionApi()
    .send({
      url: 'ws/aos/supplychain/sale-order',
      method: 'post',
      body,
      description: 'Create Sale Order (SupplyChain)',
      matchers: {
        modelName: 'com.axelor.apps.sale.db.SaleOrder',
        id: Date.now(),
        fields,
      },
    })
    .catch(e => {
      if (e.response?.status === 404) {
        return getActionApi().send({
          url: 'ws/aos/sale-order',
          method: 'post',
          body,
          description: 'Create Sale Order (Standard)',
          matchers: {
            modelName: 'com.axelor.apps.sale.db.SaleOrder',
            id: Date.now(),
            fields,
          },
        });
      } else {
        throw e;
      }
    });
}
