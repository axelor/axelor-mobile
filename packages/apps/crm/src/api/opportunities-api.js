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

const createOpportunityCriteria = (
  searchValue,
  userId,
  assigned,
  statusList,
) => {
  const criteria = [getSearchCriterias('crm_opportunity', searchValue)];

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
        fieldName: 'opportunityStatus.id',
        operator: '=',
        value: status.key,
      })),
    });
  }

  return criteria;
};

export async function searchOpportunities({
  searchValue,
  page = 0,
  userId,
  assigned,
  statusList,
  companyId,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Opportunity',
    companyId,
    criteria: createOpportunityCriteria(
      searchValue,
      userId,
      assigned,
      statusList,
    ),
    fieldKey: 'crm_opportunity',
    sortKey: 'crm_opportunity',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function getOpportunityStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.OpportunityStatus',
    fieldKey: 'crm_opportunityStatus',
    sortKey: 'crm_opportunityStatus',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function getOpportunity({opportunityId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.crm.db.Opportunity',
    id: opportunityId,
    fieldKey: 'crm_opportunity',
    relatedFields: {
      currency: ['symbol'],
      partner: [
        'isCustomer',
        'isProspect',
        'partnerSeq',
        'picture',
        'simpleFullName',
      ],
      user: ['name'],
    },
    provider: 'model',
  });
}

export async function updateOpportunityScoring({
  opportunityId,
  opportunityVersion,
  newScore,
}) {
  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity',
    method: 'post',
    body: {
      data: {
        id: opportunityId,
        version: opportunityVersion,
        opportunityRating: newScore,
      },
    },
    description: 'update opportunity scoring',
    matchers: {
      modelName: 'com.axelor.apps.crm.db.Opportunity',
      id: opportunityId,
      fields: {
        'data.opportunityRating': 'opportunityRating',
      },
    },
  });
}

export async function updateOpportunityStatus({
  opportunityId,
  version,
  opportunityStatusId,
}) {
  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity',
    method: 'post',
    body: {
      data: {
        id: opportunityId,
        version: version,
        opportunityStatus: {
          id: opportunityStatusId,
        },
      },
    },
    description: 'update opportunity status',
    matchers: {
      modelName: 'com.axelor.apps.crm.db.Opportunity',
      id: opportunityId,
      fields: {
        'data.opportunityStatus': 'opportunityStatus',
      },
    },
  });
}

export async function updateOpportunity({opportunity}) {
  const {matchers, formattedData} = formatRequestBody(opportunity, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity',
    method: 'post',
    body: {data: formattedData},
    description: 'update opportunity',
    matchers: {
      modelName: 'com.axelor.apps.crm.db.Opportunity',
      id: opportunity.id,
      fields: matchers,
    },
  });
}

export async function createOpportunity({opportunity}) {
  const {matchers, formattedData} = formatRequestBody(opportunity, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity',
    method: 'put',
    body: {data: formattedData},
    description: 'create opportunity',
    matchers: {
      modelName: 'com.axelor.apps.crm.db.Opportunity',
      id: Date.now(),
      fields: matchers,
    },
  });
}

export async function getPartnerOpportunities({partnerId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Opportunity',
    criteria: [
      {
        fieldName: 'partner.id',
        operator: '=',
        value: partnerId,
      },
    ],
    fieldKey: 'crm_opportunity',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}
