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
  getTypes,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (searchValue, stockLocationId, statusList) => {
  const Inventory = getTypes().Inventory;

  const criteria = [
    {
      fieldName: 'statusSelect',
      operator: '!=',
      value: Inventory?.statusSelect.Draft,
    },
    {
      fieldName: 'statusSelect',
      operator: '!=',
      value: Inventory?.statusSelect.Canceled,
    },
    getSearchCriterias('stock_inventory', searchValue),
  ];

  if (stockLocationId != null) {
    criteria.push({
      fieldName: 'stockLocation.id',
      operator: '=',
      value: stockLocationId,
    });
  }

  if (Array.isArray(statusList) && statusList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: statusList.map(status => ({
        fieldName: 'statusSelect',
        operator: '=',
        value: status.key,
      })),
    });
  }

  return criteria;
};

export async function fetchInventory({inventoryId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.Inventory',
    id: inventoryId,
    fieldKey: 'stock_inventory',
    provider: 'model',
  });
}

export async function searchInventoryFilter({
  searchValue,
  stockLocationId,
  statusList,
  companyId,
  page = 0,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.Inventory',
    companyId,
    criteria: createSearchCriteria(searchValue, stockLocationId, statusList),
    fieldKey: 'stock_inventory',
    sortKey: 'stock_inventory',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function modifyDescriptionInventory({
  inventoryId,
  description,
  version,
}) {
  const {matchers, formattedData} = formatRequestBody(
    {
      id: inventoryId,
      description,
      version,
    },
    'data',
  );

  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.stock.db.Inventory/${inventoryId}`,
    method: 'post',
    body: {data: formattedData},
    description: 'modify inventory description',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.Inventory',
      id: inventoryId,
      fields: matchers,
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
