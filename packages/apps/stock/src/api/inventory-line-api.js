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
  createStandardFetch,
  formatRequestBody,
  getSearchCriterias,
  getActionApi,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (
  inventoryId,
  alternativeBarcodeList,
  searchValue,
  useMassScanSortKey,
) => {
  const criteria = [
    {
      fieldName: 'inventory.id',
      operator: '=',
      value: inventoryId,
    },
    getSearchCriterias(
      useMassScanSortKey
        ? 'stock_inventoryLineMassScan'
        : 'stock_inventoryLine',
      searchValue,
    ),
  ];

  if (
    Array.isArray(alternativeBarcodeList) &&
    alternativeBarcodeList.length > 0
  ) {
    criteria.push({
      fieldName: 'product.id',
      operator: 'in',
      value: alternativeBarcodeList.map(barcode => barcode.product.id),
    });
  }

  return criteria;
};

export async function searchInventoryLines({
  inventoryId,
  alternativeBarcodeList = [],
  searchValue = null,
  page = 0,
  useMassScanSortKey = false,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.InventoryLine',
    criteria: createSearchCriteria(
      inventoryId,
      alternativeBarcodeList,
      searchValue,
      useMassScanSortKey,
    ),
    fieldKey: 'stock_inventoryLine',
    sortKey: 'stock_inventoryLine',
    page,
    provider: 'model',
  });
}

export async function updateInventoryLineDetails({
  inventoryLineId,
  version,
  stockLocationId,
  realQty,
  description = null,
}) {
  return getActionApi().send({
    url: `/ws/aos/inventory-line/${inventoryLineId}`,
    method: 'put',
    body: {
      version,
      stockLocationId,
      realQty,
      description,
    },
    description: 'update inventory line details',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.InventoryLine',
      id: inventoryLineId,
      fields: {
        stockLocationId: 'stockLocation.id',
        description,
        realQty,
      },
    },
  });
}

export async function createInventoryLine({
  inventoryId,
  inventoryVersion,
  productId,
  stockLocationId = null,
  trackingNumberId = null,
  rack = null,
  realQty,
}) {
  return getActionApi().send({
    url: '/ws/aos/inventory-line/',
    method: 'post',
    body: {
      inventoryId,
      inventoryVersion,
      productId,
      stockLocationId,
      trackingNumberId,
      rack,
      realQty,
    },
    description: 'create inventory line',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.InventoryLine',
      id: Date.now(),
      fields: {
        productId: 'product.id',
        stockLocationId: 'stockLocation.id',
        trackingNumberId: 'trackingNumber.id',
        inventoryId: 'inventory.id',
        rack,
        realQty,
      },
    },
  });
}

export async function addTrackingNumber({
  inventoryLineId,
  version,
  trackingNumber,
}) {
  const {matchers, formattedData} = formatRequestBody(
    {
      id: inventoryLineId,
      version,
      trackingNumber,
    },
    'data',
  );

  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.stock.db.InventoryLine/${inventoryLineId}`,
    method: 'post',
    body: {data: formattedData},
    description: 'add trackingNumber on inventory line',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.InventoryLine',
      id: inventoryLineId,
      fields: matchers,
    },
  });
}

export async function fetchInventoryLine({inventoryLineId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.InventoryLine',
    id: inventoryLineId,
    fieldKey: 'stock_inventoryLine',
    provider: 'model',
  });
}
