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
  createStandardFetch,
  createStandardSearch,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';
import Inventory from '../types/inventory';

const createSearchCriteria = searchValue => {
  return [
    {
      fieldName: 'statusSelect',
      operator: '!=',
      value: Inventory.status.Draft,
    },
    {
      fieldName: 'statusSelect',
      operator: '!=',
      value: Inventory.status.Canceled,
    },
    getSearchCriterias('stock_inventory', searchValue),
  ];
};

export async function fetchInventory({inventoryId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.Inventory',
    id: inventoryId,
    fieldKey: 'stock_inventory',
    provider: 'model',
  });
}

export async function searchInventoryFilter({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.Inventory',
    criteria: createSearchCriteria(searchValue),
    fieldKey: 'stock_inventory',
    sortKey: 'stock_inventory',
    page,
    provider: 'model',
  });
}

export async function modifyDescriptionInventory({
  inventoryId,
  description,
  version,
}) {
  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.stock.db.Inventory/${inventoryId}`,
    method: 'post',
    body: {
      id: inventoryId,
      description: description,
      version: version,
    },
    description: 'modify inventory description',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.Inventory',
      id: inventoryId,
      fields: {},
    },
  });
}

export async function updateInventoryStatus({
  inventoryId,
  version,
  status,
  userId = null,
}) {
  return getActionApi().send({
    url: `/ws/aos/inventory/update-status/${inventoryId}`,
    method: 'put',
    body:
      userId != null
        ? {
            version: version,
            status: status,
            userId: userId,
          }
        : {
            version: version,
            status: status,
          },
    description: 'modify inventory status',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.Inventory',
      id: inventoryId,
      fields: {
        status: 'statusSelect',
      },
    },
  });
}
