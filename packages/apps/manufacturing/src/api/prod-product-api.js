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

import {axiosApiProvider, createStandardFetch} from '@axelor/aos-mobile-core';

export async function fetchManufacturingOrderConsumedProducts({
  manufOrderId,
  manufOrderVersion,
}) {
  return axiosApiProvider.post({
    url: '/ws/aos/manuf-order/consumed-products/fetch',
    data: {
      manufOrderId: manufOrderId,
      manufOrderVersion: manufOrderVersion,
    },
  });
}

export async function fetchManufacturingOrderProducedProducts({
  manufOrderId,
  manufOrderVersion,
}) {
  return axiosApiProvider.post({
    url: '/ws/aos/manuf-order/produced-products/fetch',
    data: {
      manufOrderId: manufOrderId,
      manufOrderVersion: manufOrderVersion,
    },
  });
}

export async function searchProdProductWithId({productId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.production.db.ProdProduct',
    id: productId,
    fieldKey: 'manufacturing_prodProduct',
  });
}

export async function createProdProduct({
  manufOrderId,
  manufOrderVersion,
  productId,
  trackingNumberId,
  qty,
  productType,
}) {
  return axiosApiProvider.post({
    url: `ws/aos/manuf-order/${manufOrderId}/add-product`,
    data: {
      version: manufOrderVersion,
      productId: productId,
      trackingNumberId: trackingNumberId,
      qty: qty,
      productType: productType,
    },
  });
}

export async function updateProdProduct({
  stockMoveLineVersion,
  stockMoveLineId,
  prodProductQty,
}) {
  return axiosApiProvider.put({
    url: 'ws/aos/manuf-order/update-product-qty',
    data: {
      version: stockMoveLineVersion,
      stockMoveLineId: stockMoveLineId,
      prodProductQty: prodProductQty,
    },
  });
}
