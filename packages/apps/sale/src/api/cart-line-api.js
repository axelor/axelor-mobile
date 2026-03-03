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
  formatRequestBody,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createCartLineCriteria = (searchValue, cartId) => {
  return [
    {
      fieldName: 'cart.id',
      operator: '=',
      value: cartId,
    },
    getSearchCriterias('sale_cartLine', searchValue),
  ];
};

export async function searchCartLine({searchValue, page = 0, cartId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.sale.db.CartLine',
    criteria: createCartLineCriteria(searchValue, cartId),
    fieldKey: 'sale_cartLine',
    sortKey: 'sale_cartLine',
    page: page,
    provider: 'model',
  });
}

export async function updateCartLine({cartLine, qty, variantProduct}) {
  const body = {
    id: cartLine.id,
    version: cartLine.version,
    qty,
    variantProduct,
  };
  const {matchers, formattedData} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.sale.db.CartLine',
    method: 'post',
    body: {data: formattedData},
    description: 'Update Cart Line',
    matchers: {
      modelName: 'com.axelor.apps.sale.db.CartLine',
      id: cartLine.id,
      fields: matchers,
    },
  });
}

export async function deleteCartLine({cartLineId}) {
  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.sale.db.CartLine/${cartLineId}`,
    method: 'delete',
    description: 'Delete Cart Line',
  });
}

export async function fetchCartLineById({cartLineId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.sale.db.CartLine',
    id: cartLineId,
    fieldKey: 'sale_cartLine',
    provider: 'model',
  });
}

export async function addCartLine({cartId, cartVersion, productId, qty}) {
  if (!cartId) {
    throw {response: {status: 404, statusText: 'Sale_NoActiveCart'}};
  }

  return getActionApi().send({
    url: `/ws/aos/cart/add-line/${cartId}`,
    method: 'put',
    body: {version: cartVersion, cartId, productId, qty},
    description: 'Add Product to Cart Line',
    matchers: {
      modelName: 'com.axelor.apps.sale.db.CartLine',
      id: Date.now(),
      fields: {
        cartId: 'cart.id',
        productId: 'product.id',
        qty: 'qty',
      },
    },
  });
}
