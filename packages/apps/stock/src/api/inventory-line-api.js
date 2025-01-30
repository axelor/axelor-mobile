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
  axiosApiProvider,
  createStandardSearch,
  createStandardFetch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (inventoryId, searchValue) => {
  return [
    {
      fieldName: 'inventory.id',
      operator: '=',
      value: inventoryId,
    },
    getSearchCriterias('stock_inventoryLine', searchValue),
  ];
};

export async function searchInventoryLines({
  inventoryId,
  searchValue,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.InventoryLine',
    criteria: createSearchCriteria(inventoryId, searchValue),
    fieldKey: 'stock_inventoryLine',
    page,
  });
}

export async function updateInventoryLineDetails({
  inventoryLineId,
  version,
  realQty,
  description = null,
}) {
  return axiosApiProvider.put({
    url: `/ws/aos/inventory-line/${inventoryLineId}`,
    data: {
      version: version,
      realQty: realQty,
      description: description,
    },
  });
}

export async function createInventoryLine({
  inventoryId,
  inventoryVersion,
  productId,
  trackingNumberId = null,
  rack = null,
  realQty,
}) {
  return axiosApiProvider.post({
    url: '/ws/aos/inventory-line/',
    data: {
      inventoryId: inventoryId,
      inventoryVersion: inventoryVersion,
      productId: productId,
      trackingNumberId: trackingNumberId,
      rack: rack,
      realQty: realQty,
    },
  });
}

export async function addTrackingNumber({
  inventoryLineId,
  version,
  trackingNumber,
}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.stock.db.InventoryLine/${inventoryLineId}`,
    data: {
      data: {
        id: inventoryLineId,
        version,
        trackingNumber,
      },
    },
  });
}

export async function fetchInventoryLine({inventoryLineId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.InventoryLine',
    id: inventoryLineId,
    fieldKey: 'stock_inventoryLine',
  });
}
