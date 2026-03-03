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

const createSupplierCriteria = searchValue => {
  return [
    getSearchCriterias('quality_supplier', searchValue),
    {
      fieldName: 'isSupplier',
      operator: '=',
      value: true,
    },
  ];
};

export async function searchSupplier({page = 0, searchValue, companyId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createSupplierCriteria(searchValue),
    fieldKey: 'quality_supplier',
    sortKey: 'quality_supplier',
    page,
    companyId,
    isCompanyM2M: true,
    provider: 'model',
  });
}

const createCustomerCriteria = searchValue => {
  return [
    getSearchCriterias('quality_customer', searchValue),
    {
      fieldName: 'isCustomer',
      operator: '=',
      value: true,
    },
  ];
};

export async function searchCustomer({page = 0, searchValue, companyId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createCustomerCriteria(searchValue),
    fieldKey: 'quality_customer',
    sortKey: 'quality_customer',
    page,
    companyId,
    isCompanyM2M: true,
    provider: 'model',
  });
}
