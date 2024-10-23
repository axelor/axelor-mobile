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
  createStandardSearch,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';
import {addCartLine} from './cart-line-api';

const createCartCriteria = (searchValue, userId) => {
  const criteria = [getSearchCriterias('sale_cart', searchValue)];

  if (userId) {
    criteria.push({
      fieldName: 'user.id',
      operator: '=',
      value: userId,
    });
  }

  return criteria;
};

export async function searchCart({searchValue, page = 0, userId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.sale.db.Cart',
    criteria: createCartCriteria(searchValue, userId),
    fieldKey: 'sale_cart',
    sortKey: 'sale_cart',
    page: page,
    provider: 'model',
  });
}

export async function updateCart({partnerId, companyId, cartId, cartVersion}) {
  let data = {id: cartId, version: cartVersion};

  if (companyId != null) {
    data = {
      ...data,
      company: {
        id: companyId,
      },
    };
  }

  if (partnerId != null) {
    data = {
      ...data,
      partner: {
        id: partnerId,
      },
    };
  }

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.sale.db.Cart',
    method: 'post',
    body: {data},
    description: 'Update Cart',
    matchers: {
      modelName: 'com.axelor.apps.sale.db.Cart',
      id: cartId,
      fields: {
        companyId: 'company.id',
        partnerId: 'partner.id',
      },
    },
  });
}

export async function validateCart({id, version}) {
  return getActionApi().send({
    url: `/ws/aos/cart/validate/${id}`,
    method: 'put',
    body: {version},
    description: 'Validate Cart',
  });
}

export async function emptyCart({id, version}) {
  return getActionApi().send({
    url: `ws/aos/cart/empty/${id}`,
    method: 'put',
    body: {version},
    description: 'Empty Cart',
  });
}

export async function addProductToActiveCart({userId, productId, qty}) {
  return searchCart({userId})
    .then(res => res?.data?.data?.[0])
    .then(cart => {
      if (cart != null) {
        return addCartLine({
          cartId: cart.id,
          cartVersion: cart.version,
          productId,
          qty,
        });
      } else {
        throw {response: {status: 404, statusText: 'No active cart found'}};
      }
    });
}
