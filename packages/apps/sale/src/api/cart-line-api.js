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
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
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
  });
}

export async function updateCartLine({cartLine, qty, variantProduct}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.sale.db.CartLine',
    data: {
      data: {
        ...cartLine,
        qty,
        variantProduct,
      },
    },
  });
}

export async function deleteCartLine({cartLineId}) {
  return axiosApiProvider.delete({
    url: `/ws/rest/com.axelor.apps.sale.db.CartLine/${cartLineId}`,
  });
}

export async function fetchCartLineById({cartLineId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.sale.db.CartLine',
    id: cartLineId,
    fieldKey: 'sale_cartLine',
  });
}

export async function addCartLine({cartId, cartVersion, productId, qty}) {
  return axiosApiProvider.put({
    url: `/ws/aos/cart/add-line/${cartId}`,
    data: {version: cartVersion, productId: productId, qty},
  });
}