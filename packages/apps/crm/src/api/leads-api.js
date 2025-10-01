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
  createStandardFetch,
  createStandardSearch,
  formatRequestBody,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';
import {updateEmail} from './contact-info-api';

const createLeadCriteria = (searchValue, userId, assigned, statusList) => {
  const criteria = [
    {
      fieldName: 'leadStatus.isOpen',
      operator: '=',
      value: true,
    },
    getSearchCriterias('crm_lead', searchValue),
  ];

  if (userId != null && assigned) {
    criteria.push({
      fieldName: 'user.id',
      operator: '=',
      value: userId,
    });
  }

  if (Array.isArray(statusList) && statusList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: statusList.map(status => ({
        fieldName: 'leadStatus.id',
        operator: '=',
        value: status.key,
      })),
    });
  }

  return criteria;
};

export async function searchLeads({
  searchValue,
  page = 0,
  userId,
  assigned,
  statusList,
  companyId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Lead',
    companyId,
    criteria: createLeadCriteria(searchValue, userId, assigned, statusList),
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
  const {matchers, formattedData} = formatRequestBody(lead, 'data');

  return getActionApi()
    .send({
      url: '/ws/rest/com.axelor.apps.crm.db.Lead',
      method: 'post',
      body: {data: formattedData},
      description: 'update lead',
      matchers: {
        modelName: 'com.axelor.apps.crm.db.Lead',
        id: lead.id,
        fields: matchers,
      },
    })
    .then(
      () =>
        emailId &&
        updateEmail({
          id: emailId,
          version: emailVersion,
          email: lead.emailAddress?.address,
        }),
    );
}

export async function createLead({lead}) {
  const {matchers, formattedData} = formatRequestBody(lead, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.crm.db.Lead',
    method: 'put',
    body: {data: formattedData},
    description: 'create lead',
    matchers: {
      modelName: 'com.axelor.apps.crm.db.Lead',
      id: Date.now(),
      fields: matchers,
    },
  });
}
