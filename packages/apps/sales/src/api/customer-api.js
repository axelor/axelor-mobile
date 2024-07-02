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
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createCustomerCriteria = (
  searchValue,
  isAsssignedToMe,
  userId,
  categoryId,
) => {
  const criteria = [
    {
      operator: 'and',
      criteria: [
        {
          fieldName: 'isContact',
          operator: '=',
          value: false,
        },
        {
          operator: 'or',
          criteria: [
            {
              fieldName: 'isCustomer',
              operator: '=',
              value: true,
            },
            {
              fieldName: 'isProspect',
              operator: '=',
              value: true,
            },
          ],
        },
      ],
    },
    getSearchCriterias('sale_customer', searchValue),
  ];

  if (isAsssignedToMe) {
    criteria.push({
      fieldName: 'user.id',
      operator: '=',
      value: userId,
    });
  }

  if (categoryId != null) {
    criteria.push({
      fieldName: 'partnerCategory.id',
      operator: '=',
      value: categoryId,
    });
  }

  return criteria;
};

export async function searchCustomer({
  searchValue,
  isAsssignedToMe,
  userId,
  categoryId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createCustomerCriteria(
      searchValue,
      isAsssignedToMe,
      userId,
      categoryId,
    ),
    fieldKey: 'sale_customer',
    sortKey: 'sale_customer',
    page,
  });
}

export async function searchCustomerCategory({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.PartnerCategory',
    criteria: [getSearchCriterias('sale_customerCategory', searchValue)],
    fieldKey: 'sale_customerCategory',
    sortKey: 'sale_customerCategory',
    page,
  });
}
