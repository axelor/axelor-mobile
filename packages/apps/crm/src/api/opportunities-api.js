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
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createOpportunityCriteria = searchValue => {
  return [getSearchCriterias('crm_opportunity', searchValue)];
};

export async function searchOpportunities({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Opportunity',
    criteria: createOpportunityCriteria(searchValue),
    fieldKey: 'crm_opportunity',
    sortKey: 'crm_opportunity',
    page,
  });
}

export async function getOpportunityStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.OpportunityStatus',
    fieldKey: 'crm_opportunityStatus',
    sortKey: 'crm_opportunityStatus',
    numberElementsByPage: null,
    page: 0,
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
  });
}

export async function updateOpportunityScoring({
  opportunityId,
  opportunityVersion,
  newScore,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity',
    data: {
      data: {
        id: opportunityId,
        version: opportunityVersion,
        opportunityRating: newScore,
      },
    },
  });
}

export async function updateOpportunityStatus({
  opportunityId,
  version,
  opportunityStatusId,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity',
    data: {
      data: {
        id: opportunityId,
        version: version,
        opportunityStatus: {
          id: opportunityStatusId,
        },
      },
    },
  });
}

export async function updateOpportunity({opportunity}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity',
    data: {
      data: opportunity,
    },
  });
}

export async function createOpportunity({opportunity}) {
  return axiosApiProvider.put({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity',
    data: {
      data: opportunity,
    },
  });
}
