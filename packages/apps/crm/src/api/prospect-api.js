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

const createProspectCriteria = (searchValue, userId, assigned, statusList) => {
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
          fieldName: 'isProspect',
          operator: '=',
          value: true,
        },
      ],
    },
    getSearchCriterias('crm_prospect', searchValue),
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
        fieldName: 'partnerStatus.id',
        operator: '=',
        value: status.key,
      })),
    });
  }

  return criteria;
};

export async function searchProspect({
  searchValue,
  page = 0,
  userId,
  assigned,
  statusList,
  companyId,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    companyId,
    isCompanyM2M: true,
    criteria: createProspectCriteria(searchValue, userId, assigned, statusList),
    fieldKey: 'crm_prospect',
    sortKey: 'crm_prospect',
    page,
    provider: 'model',
    filter: filterDomain,
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

export async function updateProspect(body) {
  const {matchers} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.base.db.Partner',
    method: 'post',
    body: {data: body},
    description: 'update prospect',
    matchers: {
      modelName: 'com.axelor.apps.base.db.Partner',
      id: body.id,
      fields: matchers,
    },
  });
}
