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
  RouterProvider,
} from '@axelor/aos-mobile-core';

const createContactCriteria = (
  searchValue,
  userId,
  assigned,
  mainPartnerId,
) => {
  const criteria = [
    {
      operator: 'and',
      criteria: [
        {
          fieldName: 'isContact',
          operator: '=',
          value: true,
        },
        {
          operator: 'or',
          criteria: [
            {
              fieldName: 'mainPartner.isCustomer',
              operator: '=',
              value: true,
            },
            {
              fieldName: 'mainPartner.isProspect',
              operator: '=',
              value: true,
            },
          ],
        },
      ],
    },
    getSearchCriterias('crm_contact', searchValue),
  ];

  if (mainPartnerId != null) {
    criteria.push({
      fieldName: 'mainPartner.id',
      operator: '=',
      value: mainPartnerId,
    });
  }

  if (userId != null && assigned) {
    criteria.push({
      fieldName: 'user.id',
      operator: '=',
      value: userId,
    });
  }

  return criteria;
};

export async function searchContactWithIds(idList) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: [
      {
        fieldName: 'id',
        operator: 'in',
        value: idList,
      },
    ],
    fieldKey: 'crm_contact',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function searchContact({
  searchValue,
  page = 0,
  userId,
  assigned,
  companyId,
  mainPartnerId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    companyId,
    isCompanyM2M: true,
    criteria: createContactCriteria(
      searchValue,
      userId,
      assigned,
      mainPartnerId,
    ),
    fieldKey: 'crm_contact',
    sortKey: 'crm_contact',
    page,
    provider: 'model',
  });
}

export async function getContact({contactId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: contactId,
    fieldKey: 'crm_contact',
    provider: 'model',
  });
}

export async function updateContact({
  id,
  version,
  titleSelect,
  firstName,
  name,
  fixedPhone,
  mobilePhone,
  webSite,
  description,
  mainPartner,
  email,
  emailId,
  emailVersion,
}) {
  const route = await RouterProvider.get('EmailAddress');

  const modelName = route.replace('/ws/rest/', '');
  const {matchers: emailMatchers, formattedData: emailBody} = formatRequestBody(
    {
      id: emailId,
      version: emailVersion,
      address: email,
    },
    'data',
  );

  const {matchers: partnerMatchers, formattedData: partnerBody} =
    formatRequestBody(
      {
        id,
        version,
        titleSelect,
        firstName,
        name,
        fixedPhone,
        mobilePhone,
        webSite,
        description,
        mainPartner,
      },
      'data',
    );

  return getActionApi()
    .send({
      url: route,
      method: 'post',
      body: {data: emailBody},
      description: 'update contact email',
      matchers: {
        modelName: modelName,
        id: emailId,
        fields: emailMatchers,
      },
    })
    .then(() =>
      getActionApi().send({
        url: '/ws/rest/com.axelor.apps.base.db.Partner',
        method: 'post',
        body: {data: partnerBody},
        description: 'update contact',
        matchers: {
          modelName: 'com.axelor.apps.base.db.Partner',
          id: id,
          fields: partnerMatchers,
        },
      }),
    );
}
