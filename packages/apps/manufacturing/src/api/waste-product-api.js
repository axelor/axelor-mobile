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

import {axiosApiProvider, createStandardSearch} from '@axelor/aos-mobile-core';
import {fetchManufacturingOrder} from './manufacturing-order-api';

const createWasteProductCriteria = wasteProdProductList => {
  if (Array.isArray(wasteProdProductList) && wasteProdProductList.length > 0) {
    return [
      {
        operator: 'or',
        criteria: wasteProdProductList.map(prodProduct => ({
          fieldName: 'id',
          operator: '=',
          value: prodProduct?.id,
        })),
      },
    ];
  }

  return [];
};

export async function fetchManufacturingOrderWasteProducts({
  manufOrderId,
  page,
}) {
  return axiosApiProvider
    .get({
      url: `/ws/rest/com.axelor.apps.production.db.ManufOrder/${manufOrderId}`,
    })
    .then(res => {
      const manufOrder = res?.data?.data ? res?.data?.data[0] : null;
      if (
        manufOrder != null &&
        manufOrder.wasteProdProductList != null &&
        manufOrder.wasteProdProductList.length > 0
      ) {
        return createStandardSearch({
          model: 'com.axelor.apps.production.db.ProdProduct',
          criteria: createWasteProductCriteria(manufOrder.wasteProdProductList),
          fieldKey: 'manufacturing_prodProduct',
          page,
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
  return axiosApiProvider.post({
    url: `ws/aos/manuf-order/${manufOrderId}/waste-product`,
    data: {
      version: manufOrderVersion,
      productId: productId,
      qty: qty,
    },
  });
}

export async function updateManufacturingOrderWasteProduct({
  prodProductVersion,
  prodProductId,
  qty,
}) {
  return axiosApiProvider.put({
    url: `ws/aos/manuf-order/waste-product/${prodProductId}`,
    data: {
      version: prodProductVersion,
      qty: qty,
    },
  });
}

export async function declareManufacturingOrderWasteProduct({
  manufOrderVersion,
  manufOrderId,
}) {
  return axiosApiProvider
    .post({
      url: 'ws/action/',
      data: {
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
