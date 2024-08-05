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
  createStandardFetch,
  createStandardSearch,
  getActionApi,
  getSearchCriterias,
  RouterProvider,
} from '@axelor/aos-mobile-core';

const createClientCriteria = searchValue => {
  return [
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
};

export async function searchClient({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createClientCriteria(searchValue),
    fieldKey: 'crm_client',
    sortKey: 'crm_client',
    page,
    provider: 'model',
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

  const modelName = route.replace('/ws/rest/', '');

  return getActionApi()
    .send({
      url: route,
      method: 'post',
      body: {
        data: {
          id: emailId,
          version: emailVersion,
          address: email,
        },
      },
      description: 'update client email',
      matchers: {
        modelName: modelName,
        id: emailId,
        fields: {
          'data.address': 'address',
        },
      },
    })
    .then(() =>
      getActionApi().send({
        url: '/ws/rest/com.axelor.apps.base.db.Partner',
        method: 'post',
        body: {
          data: {
            id,
            version,
            name,
            fixedPhone,
            website,
            description,
          },
        },
        description: 'update lead',
        matchers: {
          modelName: 'com.axelor.apps.base.db.Partner',
          id: id,
          fields: {
            'data.name': 'name',
            'data.fixedPhone': 'fixedPhone',
            'data.webSite': 'webSite',
            'data.description': 'description',
          },
        },
      }),
    );
}
