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
  getTypes,
} from '@axelor/aos-mobile-core';

const createManufOrderCriteria = (
  searchValue,
  manageWorkshop,
  workshopId,
  statusList,
  productId,
) => {
  const ManufOrder = getTypes().ManufOrder;

  let criterias = [
    {
      fieldName: 'typeSelect',
      operator: '=',
      value: ManufOrder?.typeSelect.production,
    },
    {
      operator: 'OR',
      criteria: [
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: ManufOrder?.statusSelect.Planned,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: ManufOrder?.statusSelect.InProgress,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: ManufOrder?.statusSelect.StandBy,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: ManufOrder?.statusSelect.Finished,
        },
      ],
    },
    getSearchCriterias('manufacturing_manufacturingOrder', searchValue),
  ];

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

  if (productId != null) {
    criterias.push({
      fieldName: 'product.id',
      operator: '=',
      value: productId,
    });
  }

  return criterias;
};

export async function searchManufacturingOrderFilter({
  searchValue = null,
  companyId = null,
  manageWorkshop,
  workshopId = null,
  statusList,
  productId,
  page = 0,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.ManufOrder',
    filter: filterDomain,
    companyId,
    criteria: createManufOrderCriteria(
      searchValue,
      manageWorkshop,
      workshopId,
      statusList,
      productId,
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
  companyId,
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
    .then(manufOrderIds =>
      fetchManufacturingOrderByIds({manufOrderIds, companyId, page}),
    );
}

async function fetchManufacturingOrderByIds({
  manufOrderIds,
  companyId,
  page = 0,
}) {
  if (manufOrderIds == null) {
    return null;
  }

  return createStandardSearch({
    model: 'com.axelor.apps.production.db.ManufOrder',
    companyId,
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
  companyId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.ManufOrder',
    companyId,
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
        status: 'statusSelect',
      },
    },
  });
}
