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

const PARTNER_TYPES = {
  client: 'client',
  supplier: 'supplier',
  carrier: 'carrier',
};

const createSearchCriteria = (searchValue, type = PARTNER_TYPES.client) => {
  const criteria = [
    {
      fieldName: 'isContact',
      operator: '=',
      value: false,
    },
    getSearchCriterias('stock_partner', searchValue),
  ];

  if (type === PARTNER_TYPES.supplier) {
    criteria.push({
      fieldName: 'isSupplier',
      operator: '=',
      value: true,
    });
  } else if (type === PARTNER_TYPES.carrier) {
    criteria.push({
      fieldName: 'isCarrier',
      operator: '=',
      value: true,
    });
  } else {
    criteria.push({
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
    });
  }

  return criteria;
};

export async function searchSuppliersFilter({
  searchValue,
  companyId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    companyId,
    isCompanyM2M: true,
    criteria: createSearchCriteria(searchValue, PARTNER_TYPES.supplier),
    fieldKey: 'stock_partner',
    sortKey: 'stock_partner',
    page,
    provider: 'model',
  });
}

export async function searchClientsFilter({searchValue, companyId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    companyId,
    isCompanyM2M: true,
    criteria: createSearchCriteria(searchValue, PARTNER_TYPES.client),
    fieldKey: 'stock_partner',
    sortKey: 'stock_partner',
    page,
    provider: 'model',
  });
}

export async function searchCarriersFilter({searchValue, companyId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    companyId,
    isCompanyM2M: true,
    criteria: createSearchCriteria(searchValue, PARTNER_TYPES.carrier),
    fieldKey: 'stock_partner',
    sortKey: 'stock_partner',
    page,
    provider: 'model',
  });
}
