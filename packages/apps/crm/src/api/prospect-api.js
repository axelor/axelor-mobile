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

const createProspectCriteria = searchValue => {
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
          fieldName: 'isProspect',
          operator: '=',
          value: true,
        },
      ],
    },
    getSearchCriterias('crm_prospect', searchValue),
  ];
};

export async function searchProspect({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createProspectCriteria(searchValue),
    fieldKey: 'crm_prospect',
    sortKey: 'crm_prospect',
    page,
    provider: 'model',
  });
}

export async function getProspect({partnerId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: partnerId,
    fieldKey: 'crm_prospect',
    provider: 'model',
  });
}

export async function getProspectStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.PartnerStatus',
    criteria: [],
    fieldKey: 'crm_prospectStatus',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function updateProspectScoring({
  partnerId,
  partnerVersion,
  newScore,
}) {
  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.base.db.Partner',
    method: 'post',
    body: {
      data: {
        id: partnerId,
        version: partnerVersion,
        leadScoringSelect: newScore,
      },
    },
    description: 'update prospect scoring',
    matchers: {
      modelName: 'com.axelor.apps.base.db.Partner',
      id: partnerId,
      fields: {
        'data.leadScoringSelect': 'leadScoringSelect',
      },
    },
  });
}

export async function updateProspect({
  id,
  version,
  leadScoringSelect,
  name,
  fixedPhone,
  webSite,
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
      description: 'update prospect email',
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
            leadScoringSelect,
            name,
            fixedPhone,
            webSite,
            description,
          },
        },
        description: 'update prospect',
        matchers: {
          modelName: 'com.axelor.apps.base.db.Partner',
          id: id,
          fields: {
            'data.leadScoringSelect': 'leadScoringSelect',
            'data.name': 'name',
            'data.fixedPhone': 'fixedPhone',
            'data.webSite': 'webSite',
            'data.description': 'description',
          },
        },
      }),
    );
}
