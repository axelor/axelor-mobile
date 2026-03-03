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

import {createStandardFetch, getActionApi} from '@axelor/aos-mobile-core';

export async function fetchManufacturingOrderConsumedProducts({
  manufOrderId,
  manufOrderVersion,
}) {
  return getActionApi().send({
    url: '/ws/aos/manuf-order/consumed-products/fetch',
    method: 'post',
    body: {
      manufOrderId,
      manufOrderVersion,
    },
    description: 'fetch manufacturing order consumed products',
  });
}

export async function fetchManufacturingOrderProducedProducts({
  manufOrderId,
  manufOrderVersion,
}) {
  return getActionApi().send({
    url: '/ws/aos/manuf-order/produced-products/fetch',
    method: 'post',
    body: {
      manufOrderId,
      manufOrderVersion,
    },
    description: 'fetch manufacturing order produced products',
  });
}

export async function fetchOperationOrderConsumedProducts({
  operationOrderId,
  operationOrderVersion,
}) {
  return getActionApi().send({
    url: '/ws/aos/operation-order/consumed-products/fetch',
    method: 'post',
    body: {
      operationOrderId,
      operationOrderVersion,
    },
    description: 'fetch operation order consumed products',
  });
}

export async function searchProdProductWithId({productId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.production.db.ProdProduct',
    id: productId,
    fieldKey: 'manufacturing_prodProduct',
    provider: 'model',
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
  return getActionApi().send({
    url: `ws/aos/manuf-order/${manufOrderId}/add-product`,
    method: 'post',
    body: {
      version: manufOrderVersion,
      productId,
      trackingNumberId,
      qty,
      productType,
    },
    description: 'create prod product',
  });
}

export async function createOperationOrderConsumedProduct({
  operationOrderId,
  operationOrderVersion,
  productId,
  trackingNumberId,
  qty,
}) {
  return getActionApi().send({
    url: `/ws/aos/operation-order/${operationOrderId}/add-product`,
    method: 'post',
    body: {
      version: operationOrderVersion,
      productId,
      trackingNumberId,
      qty,
    },
    description: 'create operation order consumed product',
  });
}

export async function updateProdProduct({
  stockMoveLineVersion,
  stockMoveLineId,
  prodProductQty,
}) {
  return getActionApi().send({
    url: 'ws/aos/manuf-order/update-product-qty',
    method: 'put',
    body: {
      version: stockMoveLineVersion,
      stockMoveLineId,
      prodProductQty,
    },
    description: 'update prod product',
  });
}

export async function fetchStockMoveStatus({stockMoveLineId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    id: stockMoveLineId,
    fieldKey: 'manufacturing_stockMoveStatus',
    provider: 'model',
  });
}
