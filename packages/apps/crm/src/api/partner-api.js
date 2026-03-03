/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

const createPartnerAddressCriteria = partnerId => {
  return [
    {
      fieldName: 'partner.id',
      operator: '=',
      value: partnerId,
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

export async function searchPartner({searchValue, companyId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    companyId,
    isCompanyM2M: true,
    criteria: createPartnerCriteria(searchValue),
    fieldKey: 'crm_partner',
    page,
    provider: 'model',
  });
}

export async function searchClientAndProspect({
  searchValue,
  companyId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    companyId,
    isCompanyM2M: true,
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
    provider: 'model',
  });
}

export async function fetchPartnerAddresses({partnerId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.PartnerAddress',
    criteria: createPartnerAddressCriteria(partnerId),
    fieldKey: 'crm_partnerAddress',
    sortKey: 'crm_partnerAddress',
    numberElementsByPage: null,
    provider: 'model',
  });
}

export async function createPartner(body) {
  return getActionApi().send({
    url: '/ws/aos/partner',
    method: 'post',
    body: {
      ...body,
      mainPartnerId: body.mainPartner?.id,
    },
    description: 'create partner',
    matchers: {
      modelName: 'com.axelor.apps.base.db.Partner',
      id: Date.now(),
      fields: {mainPartnerId: 'mainPartner.id'},
    },
  });
}
