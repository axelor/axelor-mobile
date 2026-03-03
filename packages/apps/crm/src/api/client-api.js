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
  createStandardFetch,
  createStandardSearch,
  formatRequestBody,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createClientCriteria = (searchValue, userId, assigned) => {
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
          fieldName: 'isCustomer',
          operator: '=',
          value: true,
        },
      ],
    },
    getSearchCriterias('crm_client', searchValue),
  ];

  if (userId != null && assigned) {
    criteria.push({
      fieldName: 'user.id',
      operator: '=',
      value: userId,
    });
  }

  return criteria;
};

export async function searchClient({
  searchValue,
  page = 0,
  userId,
  assigned,
  companyId,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    companyId,
    isCompanyM2M: true,
    criteria: createClientCriteria(searchValue, userId, assigned),
    fieldKey: 'crm_client',
    sortKey: 'crm_client',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function getClient({clientId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: clientId,
    fieldKey: 'crm_client',
    provider: 'model',
  });
}

export async function updateClient(body) {
  const {matchers, formattedData} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.base.db.Partner',
    method: 'post',
    body: {data: formattedData},
    description: 'update client',
    matchers: {
      modelName: 'com.axelor.apps.base.db.Partner',
      id: body.id,
      fields: matchers,
    },
  });
}
