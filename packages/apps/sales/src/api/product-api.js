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
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createProductCriteria = searchValue => {
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
    getSearchCriterias('sales_product', searchValue),
  ];

  return criteria;
};

const createProductCompanyCriteria = (companyId, productId) => {
  return [
    {fieldName: 'company.id', operator: '=', value: companyId},
    {fieldName: 'product.id', operator: '=', value: productId},
  ];
};

export async function searchProduct({page = 0, searchValue}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Product',
    criteria: createProductCriteria(searchValue),
    fieldKey: 'sales_product',
    sortKey: 'sales_product',
    page,
  });
}

export async function fetchProductById({productId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Product',
    id: productId,
    fieldKey: 'sales_product',
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
    fieldKey: 'sales_productCompany',
    page: 0,
    numberElementsByPage: 1,
  });
}
