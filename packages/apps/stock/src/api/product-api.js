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
  createStandardSearch,
  createStandardFetch,
  getSearchCriterias,
  getActionApi,
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

const createProductCompanyCriteria = (productId, companyId) => {
  return [
    {
      fieldName: 'product.id',
      operator: '=',
      value: productId,
    },
    {
      fieldName: 'company.id',
      operator: '=',
      value: companyId,
    },
  ];
};

export async function searchProductsFilter({
  searchValue,
  page = 0,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Product',
    criteria: createProductCriteria(searchValue),
    fieldKey: 'stock_product',
    sortKey: 'stock_product',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function searchProductWithId(productId) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Product',
    id: productId,
    fieldKey: 'stock_product',
    provider: 'model',
  });
}

export async function updateLocker({
  productId,
  stockLocationId,
  newLocker,
  version,
}) {
  return getActionApi().send({
    url: `/ws/aos/stock-product/modify-locker/${productId}`,
    method: 'put',
    body: {
      stockLocationId: stockLocationId,
      newLocker: newLocker,
      version: version,
    },
    description: 'modify product locker',
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
    provider: 'model',
  });
}

export async function getProductStockIndicators({
  productId,
  companyId,
  stockLocationId,
  version,
}) {
  return getActionApi().send({
    url: `/ws/aos/stock-product/fetch-product-with-stock/${productId}`,
    method: 'post',
    body: {
      companyId,
      stockLocationId,
      version,
    },
    description: 'get product stock indicators',
  });
}

export async function fetchVariantAttributes({productVariantId, version}) {
  return getActionApi().send({
    url: `/ws/aos/stock-product/get-variant-attributes/${productVariantId}`,
    method: 'post',
    body: {
      version,
    },
    description: 'fetch variant attributes',
  });
}

export async function fetchProductCompanyWithId({productId, companyId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.ProductCompany',
    criteria: createProductCompanyCriteria(productId, companyId),
    fieldKey: 'stock_productCompany',
    sortKey: 'stock_productCompany',
    numberElementsByPage: 1,
    page: 0,
    provider: 'model',
  });
}
