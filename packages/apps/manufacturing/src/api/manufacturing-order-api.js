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
import ManufacturingOrder from '../types/manufacturing-order';

const createManufOrderCriteria = (
  companyId,
  workshopId,
  manageWorkshop,
  searchValue,
) => {
  let criterias = [
    {
      fieldName: 'typeSelect',
      operator: '=',
      value: ManufacturingOrder.type.production,
    },
    {
      operator: 'OR',
      criteria: [
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: ManufacturingOrder.status.Planned,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: ManufacturingOrder.status.InProgress,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: ManufacturingOrder.status.StandBy,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: ManufacturingOrder.status.Finished,
        },
      ],
    },
    getSearchCriterias('manufacturing_manufacturingOrder', searchValue),
  ];

  if (companyId != null) {
    criterias.push({
      fieldName: 'company.id',
      operator: '=',
      value: companyId,
    });
  }

  if (workshopId != null && manageWorkshop) {
    criterias.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'workshopStockLocation.id',
          operator: '=',
          value: workshopId,
        },
        {
          fieldName: 'workshopStockLocation.parentStockLocation.id',
          operator: '=',
          value: workshopId,
        },
      ],
    });
  }

  return criterias;
};

export async function searchManufacturingOrderFilter({
  companyId = null,
  workshopId = null,
  searchValue = null,
  manageWorkshop,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.ManufOrder',
    criteria: createManufOrderCriteria(
      companyId,
      workshopId,
      manageWorkshop,
      searchValue,
    ),
    fieldKey: 'manufacturing_manufacturingOrder',
    sortKey: 'manufacturing_manufacturingOrder',
    page,
    provider: 'model',
  });
}

export async function fetchManufacturingOrder({manufOrderId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.production.db.ManufOrder',
    id: manufOrderId,
    fieldKey: 'manufacturing_manufacturingOrder',
    relatedFields: {product: ['name', 'code', 'picture']},
    provider: 'model',
  });
}

export async function fetchManufacturingOrderOfProductionOrder({
  productionOrderList,
  page = 0,
}) {
  if (productionOrderList == null) {
    return null;
  }

  return createStandardSearch({
    model: 'com.axelor.apps.production.db.ProductionOrder',
    criteria: [
      {
        fieldName: 'id',
        operator: 'in',
        value: productionOrderList.map(productionOrder => productionOrder.id),
      },
    ],
    fieldKey: 'manufacturing_productionOrder',
    page: 0,
    numberElementsByPage: null,
    provider: 'model',
  })
    .then(res => {
      const result = res?.data?.data;

      const manufOrderList = result?.flatMap(
        productionOrder => productionOrder?.manufOrderSet,
      );

      return manufOrderList?.map(manufOrder => manufOrder.id);
    })
    .then(manufOrderIds => fetchManufacturingOrderByIds({manufOrderIds, page}));
}

async function fetchManufacturingOrderByIds({manufOrderIds, page = 0}) {
  if (manufOrderIds == null) {
    return null;
  }

  return createStandardSearch({
    model: 'com.axelor.apps.production.db.ManufOrder',
    criteria: [
      {
        fieldName: 'id',
        operator: 'in',
        value: manufOrderIds,
      },
    ],
    fieldKey: 'manufacturing_manufacturingOrderShort',
    sortKey: 'manufacturing_manufacturingOrder',
    page,
    provider: 'model',
  });
}

export async function fetchChildrenManufacturingOrders({
  parentManufOrderId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.ManufOrder',
    criteria: [
      {
        fieldName: 'parentMO.id',
        operator: '=',
        value: parentManufOrderId,
      },
    ],
    fieldKey: 'manufacturing_manufacturingOrder',
    sortKey: 'manufacturing_manufacturingOrder',
    page,
    provider: 'model',
  });
}

export async function updateManufacturingOrderStatus({
  manufOrderId,
  manufOrderVersion,
  targetStatus,
}) {
  return getActionApi().send({
    url: `ws/aos/manuf-order/${manufOrderId}`,
    method: 'put',
    body: {
      version: manufOrderVersion,
      status: targetStatus,
    },
    description: 'update manufacturing order status',
    matchers: {
      id: manufOrderId,
      modelName: 'com.axelor.apps.production.db.ManufOrder',
      fields: {
        statusSelect: 'status',
      },
    },
  });
}
