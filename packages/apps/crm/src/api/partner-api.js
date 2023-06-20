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
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createClientAndProspectCriteria = searchValue => {
  return [
    {
      operator: 'or',
      criteria: [
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
      ],
    },
    getSearchCriterias('crm_partner', searchValue),
  ];
};

const createLinkedPartnersOfContactCriteria = contactId => {
  return [
    {
      fieldName: 'contactPartnerSet.id',
      operator: '=',
      value: contactId,
    },
  ];
};

const createPartnerCriteria = searchValue => {
  return [
    {
      fieldName: 'isEmployee',
      operator: '=',
      value: false,
    },
    getSearchCriterias('crm_partner', searchValue),
    {
      operator: 'or',
      criteria: [
        {
          fieldName: 'isCustomer',
          operator: '=',
          value: true,
        },
        {
          fieldName: 'isSupplier',
          operator: '=',
          value: true,
        },
        {
          fieldName: 'isProspect',
          operator: '=',
          value: true,
        },
      ],
    },
  ];
};

export async function getPartner({partnerId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: partnerId,
    fieldKey: 'crm_partner',
    provider: 'model',
  });
}

export async function searchPartner({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createPartnerCriteria(searchValue),
    fieldKey: 'crm_partner',
    page,
  });
}

export async function searchClientAndProspect({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createClientAndProspectCriteria(searchValue),
    fieldKey: 'crm_partner',
    page,
    provider: 'model',
  });
}

export async function searchLinkedPartnersOfContact({contactId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createLinkedPartnersOfContactCriteria(contactId),
    fieldKey: 'crm_partner',
    page: 0,
    numberElementsByPage: null,
  });
}
