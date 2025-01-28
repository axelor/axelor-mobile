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

import {
  axiosApiProvider,
  createStandardSearch,
  createStandardFetch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createProductCriteria = searchValue => {
  return [
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
    getSearchCriterias('stock_product', searchValue),
  ];
};

export async function searchProductsFilter({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Product',
    criteria: createProductCriteria(searchValue),
    fieldKey: 'stock_product',
    sortKey: 'stock_product',
    page,
  });
}

export async function searchProductWithId(productId) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Product',
    id: productId,
    fieldKey: 'stock_product',
  });
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
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Product',
    criteria: [
      {
        fieldName: 'parentProduct.id',
        operator: '=',
        value: productVariantParentId,
      },
    ],
    fieldKey: 'stock_product',
    sortKey: 'stock_product',
    page,
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
