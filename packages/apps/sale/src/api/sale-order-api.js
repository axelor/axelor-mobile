/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
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
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.sale.db.SaleOrder',
    criteria: createSaleOrderCriteria(searchValue, statusList, customerId),
    fieldKey: 'sale_saleOrder',
    sortKey: 'sale_saleOrder',
    page,
  });
}

export async function fetchSaleOrderById({saleOrderId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.sale.db.SaleOrder',
    id: saleOrderId,
    fieldKey: 'sale_saleOrder',
  });
}

export async function updateSaleOrderStatus({
  saleOrderId,
  saleOrderVersion,
  status,
}) {
  return axiosApiProvider.put({
    url: `ws/aos/sale-order/status/${saleOrderId}`,
    data: {
      version: saleOrderVersion,
      toStatus: mapStatusToAPIValue(status),
    },
  });
}

export async function createSaleOrder({saleOrderLineList, customerId}) {
  return axiosApiProvider.post({
    url: '/ws/aos/sale-order',
    data: {saleOrderLineList, clientPartnerId: customerId},
  });
}
