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
  formatRequestBody,
  getActionApi,
  getSearchCriterias,
  RouterProvider,
} from '@axelor/aos-mobile-core';

const createLeadCriteria = searchValue => {
  return [
    {
      fieldName: 'leadStatus.isOpen',
      operator: '=',
      value: true,
    },
    getSearchCriterias('crm_lead', searchValue),
  ];
};

export async function searchLeads({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Lead',
    criteria: createLeadCriteria(searchValue),
    fieldKey: 'crm_lead',
    sortKey: 'crm_lead',
    page,
    provider: 'model',
  });
}

export async function getLead({leadId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.crm.db.Lead',
    id: leadId,
    fieldKey: 'crm_lead',
    provider: 'model',
  });
}

export async function getLeadStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.LeadStatus',
    criteria: [
      {
        fieldName: 'isOpen',
        operator: '=',
        value: true,
      },
    ],
    fieldKey: 'crm_leadStatus',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function updateLeadScoring({leadId, leadVersion, newScore}) {
  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.crm.db.Lead',
    method: 'post',
    body: {
      data: {
        id: leadId,
        version: leadVersion,
        leadScoringSelect: newScore,
      },
    },
    description: 'update lead scoring',
    matchers: {
      modelName: 'com.axelor.apps.crm.db.Lead',
      id: leadId,
      fields: {
        'data.leadScoringSelect': 'leadScoringSelect',
      },
    },
  });
}

export async function updateLead({lead, emailId, emailVersion}) {
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
          address: lead.emailAddress?.address,
        },
      },
      description: 'update lead email',
      matchers: {
        modelName: modelName,
        id: emailId,
        fields: {
          'data.address': 'address',
        },
      },
    })
    .then(() => {
      const {matchers} = formatRequestBody(lead, 'data');

      return getActionApi().send({
        url: '/ws/rest/com.axelor.apps.crm.db.Lead',
        method: 'post',
        body: {
          data: lead,
        },
        description: 'update lead',
        matchers: {
          modelName: 'com.axelor.apps.crm.db.Lead',
          id: lead.id,
          fields: matchers,
        },
      });
    });
}

export async function createLead({lead}) {
  const {matchers} = formatRequestBody(lead, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.crm.db.Lead',
    method: 'put',
    body: {
      data: lead,
    },
    description: 'create lead',
    matchers: {
      modelName: 'com.axelor.apps.crm.db.Lead',
      id: Date.now(),
      fields: matchers,
    },
  });
}
