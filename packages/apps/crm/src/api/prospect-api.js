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
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createProspectCriteria(searchValue, userId, assigned, statusList),
    fieldKey: 'crm_prospect',
    sortKey: 'crm_prospect',
    page,
  });
}

export async function getProspect({partnerId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: partnerId,
    fieldKey: 'crm_prospect',
  });
}

export async function getProspectStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.PartnerStatus',
    criteria: [],
    fieldKey: 'crm_prospectStatus',
    numberElementsByPage: null,
    page: 0,
  });
}

export async function updateProspectScoring({
  partnerId,
  partnerVersion,
  newScore,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner',
    data: {
      data: {
        id: partnerId,
        version: partnerVersion,
        leadScoringSelect: newScore,
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
    .then(() =>
      axiosApiProvider.post({
        url: '/ws/rest/com.axelor.apps.base.db.Partner',
        data: {
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
      }),
    );
}
