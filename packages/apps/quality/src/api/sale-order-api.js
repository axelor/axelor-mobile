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
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createCustomerOrderCriteria = (
  searchValue,
  customerPartner,
  saleOrderIdList,
) => {
  const criteria = [getSearchCriterias('quality_customerOrder', searchValue)];

  if (customerPartner != null) {
    criteria.push({
      fieldName: 'clientPartner.id',
      operator: '=',
      value: customerPartner.id,
    });
  }

  if (Array.isArray(saleOrderIdList) && saleOrderIdList?.length > 0) {
    criteria.push({
      fieldName: 'id',
      operator: 'in',
      value: saleOrderIdList,
    });
  }

  return criteria;
};

export async function searchCustomerOrder({
  page = 0,
  searchValue,
  companyId,
  customerPartner,
  saleOrderIdList,
}) {
  if (
    !customerPartner &&
    (!Array.isArray(saleOrderIdList) || saleOrderIdList?.length === 0)
  ) {
    return undefined;
  }

  return createStandardSearch({
    model: 'com.axelor.apps.sale.db.SaleOrder',
    criteria: createCustomerOrderCriteria(
      searchValue,
      customerPartner,
      saleOrderIdList,
    ),
    fieldKey: 'quality_customerOrder',
    sortKey: 'quality_customerOrder',
    page,
    provider: 'model',
    companyId,
  });
}
