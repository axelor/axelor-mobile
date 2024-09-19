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
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

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
  });
}

export async function updateCart({partnerId, cartId, cartVersion}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.sale.db.Cart',
    data: {
      data: {
        id: cartId,
        version: cartVersion,
        partner:
          partnerId != null
            ? {
                id: partnerId,
              }
            : null,
      },
    },
  });
}

export async function validateCart({id, version}) {
  return axiosApiProvider.put({
    url: `/ws/aos/cart/validate/${id}`,
    data: {version},
  });
}
