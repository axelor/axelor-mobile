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

export async function searchCustomer({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createCustomerCriteria(searchValue),
    fieldKey: 'helpdesk_customer',
    sortKey: 'helpdesk_customer',
    page: page,
  });
}

export async function searchCustomerContact({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createCustomerContactCriteria(searchValue),
    fieldKey: 'helpdesk_customerContact',
    sortKey: 'helpdesk_customerContact',
    page: page,
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
  });
}
