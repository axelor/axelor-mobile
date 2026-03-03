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
  createStandardSearch,
  createStandardFetch,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';
import {fetchManufacturingOrder} from './manufacturing-order-api';

const createWasteProductCriteria = (searchValue, wasteProdProductList) => {
  const criteria = [
    getSearchCriterias('manufacturing_prodProduct', searchValue),
  ];

  if (Array.isArray(wasteProdProductList) && wasteProdProductList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: wasteProdProductList.map(prodProduct => ({
        fieldName: 'id',
        operator: '=',
        value: prodProduct?.id,
      })),
    });
  }

  return criteria;
};

export async function fetchManufacturingOrderWasteProducts({
  searchValue = null,
  manufOrderId,
  page,
}) {
  return createStandardFetch({
    model: 'com.axelor.apps.production.db.ManufOrder',
    id: manufOrderId,
    fieldKey: 'manufacturing_manufacturingOrder',
    provider: 'model',
  }).then(res => {
    const manufOrder = res?.data?.data ? res?.data?.data[0] : null;
    if (
      manufOrder != null &&
      manufOrder.wasteProdProductList != null &&
      manufOrder.wasteProdProductList.length > 0
    ) {
      return createStandardSearch({
        model: 'com.axelor.apps.production.db.ProdProduct',
        criteria: createWasteProductCriteria(
          searchValue,
          manufOrder.wasteProdProductList,
        ),
        fieldKey: 'manufacturing_prodProduct',
        page,
        provider: 'model',
      });
    } else {
      return {data: {data: []}};
    }
  });
}

export async function createManufacturingOrderWasteProduct({
  manufOrderVersion,
  manufOrderId,
  productId,
  qty,
}) {
  return getActionApi().send({
    url: `ws/aos/manuf-order/${manufOrderId}/waste-product`,
    method: 'post',
    body: {
      version: manufOrderVersion,
      productId,
      qty,
    },
    description: 'create manufacturing order waste product',
  });
}

export async function updateManufacturingOrderWasteProduct({
  prodProductVersion,
  prodProductId,
  qty,
}) {
  return getActionApi().send({
    url: `ws/aos/manuf-order/waste-product/${prodProductId}`,
    method: 'put',
    body: {
      version: prodProductVersion,
      qty,
    },
    description: 'update manufacturing order waste product',
    matchers: {
      id: prodProductId,
      modelName: 'com.axelor.apps.production.db.ProdProduct',
      fields: {qty},
    },
  });
}

export async function declareManufacturingOrderWasteProduct({
  manufOrderVersion,
  manufOrderId,
}) {
  return getActionApi()
    .send({
      url: 'ws/action/',
      method: 'post',
      body: {
        action:
          'com.axelor.apps.production.web.ManufOrderController:generateWasteStockMove',
        data: {
          context: {
            _model: 'com.axelor.apps.production.db.ManufOrder',
            id: manufOrderId,
            version: manufOrderVersion,
          },
        },
        model: 'com.axelor.apps.production.db.ManufOrder',
      },
      description: 'declare manufacturing order waste product',
    })
    .then(result => {
      if (result?.data?.status === 0) {
        return fetchManufacturingOrder({manufOrderId}).then(
          manufOrderResult => {
            const manufOrder =
              manufOrderResult?.data?.data && manufOrderResult?.data?.data[0];
            return {
              data: {
                messageStatus: `Waste products declared in stock move ${manufOrder?.wasteStockMove?.stockMoveSeq}`,
                data: [
                  {
                    stockMoveCreated: true,
                    wasteStockMove: manufOrder?.wasteStockMove,
                  },
                ],
              },
            };
          },
        );
      } else {
        return {
          data: {
            messageStatus: 'Could not declare waste products',
            data: [{stockMoveCreated: false, wasteStockMove: null}],
          },
        };
      }
    });
}
