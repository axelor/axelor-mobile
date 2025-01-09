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
  RouterProvider,
} from '@axelor/aos-mobile-core';

const createContactCriteria = searchValue => {
  return [
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
  });
}

export async function searchContact({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createContactCriteria(searchValue),
    fieldKey: 'crm_contact',
    sortKey: 'crm_contact',
    page,
  });
}

export async function getContact({contactId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: contactId,
    fieldKey: 'crm_contact',
  });
}

export async function updateContact({
  contactId,
  contactVersion,
  contactCivility,
  contactFirstname,
  contactName,
  contactFixedPhone,
  contactMobilePhone,
  contactWebsite,
  contactDescription,
  mainPartnerId,
  contactEmail,
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
          address: contactEmail,
        },
      },
    })
    .then(res =>
      axiosApiProvider.post({
        url: '/ws/rest/com.axelor.apps.base.db.Partner',
        data: {
          data: {
            id: contactId,
            version: contactVersion,
            titleSelect: contactCivility,
            firstName: contactFirstname,
            name: contactName,
            fixedPhone: contactFixedPhone,
            mobilePhone: contactMobilePhone,
            webSite: contactWebsite,
            description: contactDescription,
            mainPartner: {id: mainPartnerId},
          },
        },
      }),
    );
}
