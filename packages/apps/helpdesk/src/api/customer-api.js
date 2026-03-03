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
  createStandardFetch,
} from '@axelor/aos-mobile-core';

const createCustomerCriteria = searchValue => {
  return [
    {
      fieldName: 'isCustomer',
      operator: '=',
      value: true,
    },
    getSearchCriterias('helpdesk_customer', searchValue),
  ];
};

const createCustomerContactCriteria = searchValue => {
  return [getSearchCriterias('helpdesk_customerContact', searchValue)];
};

export async function searchCustomer({searchValue, companyId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    companyId,
    isCompanyM2M: true,
    criteria: createCustomerCriteria(searchValue),
    fieldKey: 'helpdesk_customer',
    sortKey: 'helpdesk_customer',
    page: page,
    provider: 'model',
  });
}

export async function searchCustomerContact({
  searchValue,
  companyId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    companyId,
    isCompanyM2M: true,
    criteria: createCustomerContactCriteria(searchValue),
    fieldKey: 'helpdesk_customerContact',
    sortKey: 'helpdesk_customerContact',
    page: page,
    provider: 'model',
  });
}

export async function getCustomer({customerId}) {
  if (customerId == null) {
    return null;
  }

  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: customerId,
    fieldKey: 'helpdesk_customer',
    provider: 'model',
  });
}
