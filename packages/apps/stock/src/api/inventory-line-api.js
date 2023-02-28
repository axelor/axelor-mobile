/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {axiosApiProvider, getObjectFields} from '@axelor/aos-mobile-core';

export async function searchInventoryLines({inventoryId, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.InventoryLine/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: [
              {
                fieldName: 'inventory.id',
                operator: '=',
                value: inventoryId,
              },
            ],
          },
        ],
      },
      fields: getObjectFields('stock_inventoryLine'),
      limit: 10,
      offset: 10 * page,
    },
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
