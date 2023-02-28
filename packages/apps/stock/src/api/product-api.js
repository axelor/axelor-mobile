/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
  getApiResponseData,
  getFirstData,
  getObjectFields,
} from '@axelor/aos-mobile-core';

const sortByFields = ['name'];

const createProductCriteria = searchValue => {
  let criterias = [];
  criterias.push(
    {
      fieldName: 'isModel',
      operator: '=',
      value: false,
    },
    {
      fieldName: 'productTypeSelect',
      operator: '=',
      value: 'storable',
    },
    {
      fieldName: 'stockManaged',
      operator: '=',
      value: true,
    },
    {
      fieldName: 'dtype',
      operator: '=',
      value: 'Product',
    },
  );

  if (searchValue != null) {
    criterias.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'name',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'code',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'serialNumber',
          operator: 'like',
          value: searchValue,
        },
      ],
    });
  }
  return criterias;
};

export async function searchProductsFilter({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Product/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createProductCriteria(searchValue),
          },
        ],
      },
      fields: getObjectFields('stock_product'),
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function searchProductWithId(productId) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.base.db.Product/${productId}/fetch`,
    data: {
      fields: getObjectFields('stock_product'),
    },
  });
}

export function searchProductBySerialNumber(serialNumber) {
  return axiosApiProvider
    .post({
      url: '/ws/rest/com.axelor.apps.base.db.Product/search',
      data: {
        data: {
          criteria: [
            {
              fieldName: 'serialNumber',
              operator: '=',
              value: serialNumber,
            },
          ],
        },
        fields: getObjectFields('stock_product'),
        limit: 1,
        offset: 0,
      },
    })
    .then(getApiResponseData)
    .then(getFirstData);
}

export async function updateLocker({
  productId,
  stockLocationId,
  newLocker,
  version,
}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-product/modify-locker/${productId}`,
    data: {
      stockLocationId: stockLocationId,
      newLocker: newLocker,
      version: version,
    },
  });
}

export async function fetchVariants({productVariantParentId, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Product/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: [
              {
                fieldName: 'parentProduct.id',
                operator: '=',
                value: productVariantParentId,
              },
            ],
          },
        ],
      },
      fields: getObjectFields('stock_product'),
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function getProductStockIndicators({
  productId,
  companyId,
  stockLocationId,
  version,
}) {
  return axiosApiProvider.post({
    url: `/ws/aos/stock-product/fetch-product-with-stock/${productId}`,
    data: {
      companyId: companyId,
      stockLocationId: stockLocationId,
      version: version,
    },
  });
}

export async function fetchVariantAttributes({productVariantId, version}) {
  return axiosApiProvider.post({
    url: `/ws/aos/stock-product/get-variant-attributes/${productVariantId}`,
    data: {version: version},
  });
}
