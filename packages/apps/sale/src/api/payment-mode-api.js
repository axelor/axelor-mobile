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
} from '@axelor/aos-mobile-core';

const IN_PAYMENT_MODE = 1;

const createPaymentModeCriteria = searchValue => {
  const criteria = [
    {
      fieldName: 'inOutSelect',
      operator: '=',
      value: IN_PAYMENT_MODE,
    },
    getSearchCriterias('sale_paymentMode', searchValue),
  ];

  return criteria;
};

export async function searchPaymentMode({searchValue, page = 0, filterDomain}) {
  return createStandardSearch({
    model: 'com.axelor.apps.account.db.PaymentMode',
    criteria: createPaymentModeCriteria(searchValue),
    fieldKey: 'sale_paymentMode',
    sortKey: 'sale_paymentMode',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}
