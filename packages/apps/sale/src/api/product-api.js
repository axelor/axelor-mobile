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

const createProductCriteria = ({
  searchValue,
  productTypeSelect,
  productCategory,
}) => {
  const criteria = [
    {
      fieldName: 'isModel',
      operator: '=',
      value: false,
    },
    {
      fieldName: 'sellable',
      operator: '=',
      value: true,
    },
    {
      fieldName: 'isShippingCostsProduct',
      operator: '=',
      value: false,
    },
    {
      fieldName: 'dtype',
      operator: '=',
      value: 'Product',
    },
    getSearchCriterias('sale_product', searchValue),
  ];

  if (Array.isArray(productTypeSelect) && productTypeSelect.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: productTypeSelect.map(typeSelect => ({
        fieldName: 'productTypeSelect',
        operator: '=',
        value: typeSelect.value,
      })),
    });
  }

  if (productCategory) {
    criteria.push({
      fieldName: 'productCategory.id',
      operator: '=',
      value: productCategory.id,
    });
  }

  return criteria;
};

const createProductCategoryCriteria = searchValue => {
  return [getSearchCriterias('sale_productCategory', searchValue)];
};

const createProductCompanyCriteria = (companyId, productId) => {
  return [
    {fieldName: 'company.id', operator: '=', value: companyId},
    {fieldName: 'product.id', operator: '=', value: productId},
  ];
};

const createVariantProductCriteria = (searchValue, parentProductId) => {
  return [
    {
      fieldName: 'parentProduct.id',
      operator: '=',
      value: parentProductId,
    },
    getSearchCriterias('sale_product', searchValue),
  ];
};

export async function searchProduct({
  page = 0,
  searchValue,
  productTypeSelect,
  productCategory,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Product',
    criteria: createProductCriteria({
      searchValue,
      productTypeSelect,
      productCategory,
    }),
    fieldKey: 'sale_product',
    sortKey: 'sale_product',
    page,
  });
}
export async function searchProductCategory({page = 0, searchValue}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.ProductCategory',
    criteria: createProductCategoryCriteria(searchValue),
    fieldKey: 'sale_productCategory',
    sortKey: 'sale_productCategory',
    page,
  });
}

export async function fetchProductById({productId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Product',
    id: productId,
    fieldKey: 'sale_product',
    relatedFields: {
      saleProductMultipleQtyList: ['name', 'multipleQty'],
    },
  });
}

export async function fetchProductCompanyConfig({companyId, productId}) {
  if (companyId == null) {
    return null;
  }

  return createStandardSearch({
    model: 'com.axelor.apps.base.db.ProductCompany',
    criteria: createProductCompanyCriteria(companyId, productId),
    fieldKey: 'sale_productCompany',
    page: 0,
    numberElementsByPage: 1,
  });
}

export async function fetchVariantProduct({
  searchValue,
  parentProductId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Product',
    criteria: createVariantProductCriteria(searchValue, parentProductId),
    fieldKey: 'sale_product',
    sortKey: 'sale_product',
    page,
  });
}

export async function fetchVariantAttributes({productVariantId, version}) {
  return axiosApiProvider.post({
    url: `/ws/aos/stock-product/get-variant-attributes/${productVariantId}`,
    data: {version: version},
  });
}
