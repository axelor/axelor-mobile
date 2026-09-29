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

import {handlerApiCall} from '@axelor/aos-mobile-core';
import {searchProductCompanyConfig} from '../api/product-api';

const COMPANY_PRICE_FIELDS = ['salePrice', 'saleCurrency'];

const getCompanySpecificPriceFields = (base: any) =>
  base?.companySpecificProductFieldsSet
    ?.map(({name}: any) => name)
    .filter((name: string) => COMPANY_PRICE_FIELDS.includes(name)) ?? [];

const mergeProductCompanyFields = (
  product: any,
  productCompany: any,
  fieldNames: string[],
) => {
  if (product == null || productCompany == null) return product;

  return fieldNames.reduce(
    (result, _name) => ({...result, [_name]: productCompany[_name]}),
    product,
  );
};

export const applyCompanyPrices = async ({
  list,
  getState,
  getProduct = item => item,
  setProduct = (_item, product) => product,
}: {
  list: any[];
  getState: () => any;
  getProduct?: (_v: any) => any;
  setProduct?: (_i: any, _p: any) => any;
}) => {
  const state = getState();
  const companyId = state?.user?.user?.activeCompany?.id;
  const fieldNames = getCompanySpecificPriceFields(state?.appConfig?.base);
  const productIds = Array.isArray(list)
    ? list.map(item => getProduct(item)?.id).filter(id => id != null)
    : [];

  if (companyId == null || fieldNames.length === 0 || productIds.length === 0)
    return list;

  const productCompanyList = await handlerApiCall({
    fetchFunction: searchProductCompanyConfig,
    data: {companyId, productIds: [...new Set(productIds)]},
    action: 'Sale_SliceAction_SearchProductCompanyConfig',
    getState,
    responseOptions: {isArrayResponse: true},
  });

  if (!Array.isArray(productCompanyList)) return list;

  return list.map(item => {
    const product = getProduct(item);
    const productCompany = productCompanyList.find(
      ({product: _product}) => _product?.id === product?.id,
    );

    return setProduct(
      item,
      mergeProductCompanyFields(product, productCompany, fieldNames),
    );
  });
};
