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
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
  RouterProvider,
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

export async function searchClient({searchValue, page = 0, userId, assigned}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createClientCriteria(searchValue, userId, assigned),
    fieldKey: 'crm_client',
    sortKey: 'crm_client',
    page,
  });
}

export async function getClient({clientId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: clientId,
    fieldKey: 'crm_client',
  });
}

export async function updateClient({
  id,
  version,
  name,
  fixedPhone,
  website,
  description,
  email,
  emailId,
  emailVersion,
}) {
  const route = await RouterProvider.get('EmailAddress');

  return axiosApiProvider
    .post({
      url: route,
      data: {
        data: {
          id: emailId,
          version: emailVersion,
          address: email,
        },
      },
    })
    .then(res =>
      axiosApiProvider.post({
        url: '/ws/rest/com.axelor.apps.base.db.Partner',
        data: {
          data: {
            id,
            version,
            name,
            fixedPhone,
            website,
            description,
          },
        },
      }),
    );
}
