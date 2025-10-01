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
  createStandardSearch,
  formatRequestBody,
  getActionApi,
  RouterProvider,
} from '@axelor/aos-mobile-core';

const createPartnerAddressCriteria = partnerId => {
  return [
    {
      fieldName: 'partner.id',
      operator: '=',
      value: partnerId,
    },
    {
      fieldName: 'isDefaultAddr',
      operator: '=',
      value: true,
    },
    {
      fieldName: 'isDeliveryAddr',
      operator: '=',
      value: true,
    },
    {
      fieldName: 'isInvoicingAddr',
      operator: '=',
      value: true,
    },
  ];
};

export async function getAddress({country, city, zip, streetName}) {
  return getActionApi().send({
    url: '/ws/aos/address',
    method: 'post',
    body: {
      country,
      city,
      zip,
      streetName,
    },
    description: 'find/create address',
  });
}

export async function updateAddress({
  isLead,
  id,
  version,
  partnerAddress,
  country,
  city,
  zip,
  streetName,
}) {
  return getAddress({
    country,
    city,
    zip,
    streetName,
  }).then(async resAddress => {
    if (!isLead) {
      let _partnerAddress = partnerAddress;

      if (_partnerAddress == null) {
        const res = await createStandardSearch({
          model: 'com.axelor.apps.base.db.PartnerAddress',
          criteria: createPartnerAddressCriteria(id),
          fieldKey: 'crm_partnerAddress',
          page: 0,
          numberElementsByPage: null,
          provider: 'model',
        });
        _partnerAddress = res?.data?.data?.[0];
      }

      await updatePartnerAddress({
        id: _partnerAddress?.id,
        version: _partnerAddress?.version,
        address: resAddress.data?.object,
      });
    }

    return updateMainAddress({
      modelName: isLead
        ? 'com.axelor.apps.crm.db.Lead'
        : 'com.axelor.apps.base.db.Partner',
      id,
      body: {
        id,
        version,
        [isLead ? 'address' : 'mainAddress']: resAddress.data?.object,
      },
    });
  });
}

export async function updatePartnerAddress({id, version, address}) {
  if (id == null) {
    return;
  }

  const {matchers, formattedData} = formatRequestBody(
    {id, version, address},
    'data',
  );

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.base.db.PartnerAddress',
    method: 'post',
    body: {data: formattedData},
    description: 'update partner address',
    matchers: {
      modelName: 'com.axelor.apps.base.db.PartnerAddress',
      id,
      fields: matchers,
    },
  });
}

export async function updateMainAddress({modelName, id, body}) {
  const {matchers, formattedData} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: `/ws/rest/${modelName}`,
    method: 'post',
    body: {data: formattedData},
    description: 'update address',
    matchers: {modelName, id, fields: matchers},
  });
}

export async function deletePartnerAddress({id}) {
  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.base.db.PartnerAddress/${id}`,
    method: 'delete',
    description: 'delete partner address',
    matchers: {
      modelName: 'com.axelor.apps.base.db.PartnerAddress',
      id,
    },
  });
}

export async function addPartnerAddress({
  partnerId,
  partnerVersion,
  country,
  city,
  zip,
  streetName,
}) {
  return getAddress({
    country,
    city,
    zip,
    streetName,
  }).then(async resAddress => {
    return getActionApi().send({
      url: `/ws/aos/partner/${partnerId}/address/${resAddress.data?.object?.id}`,
      method: 'put',
      body: {
        version: partnerVersion,
      },
      description: 'add partner address',
    });
  });
}

export async function updateEmail({id, version, email, partner}) {
  const route = await RouterProvider.get('EmailAddress');

  const modelName = route.replace('/ws/rest/', '');
  const {matchers, formattedData} = formatRequestBody(
    {
      id,
      version,
      address: email,
      partner,
    },
    'data',
  );

  return getActionApi().send({
    url: route,
    method: 'post',
    body: {data: formattedData},
    description: 'update email',
    matchers: {
      modelName: modelName,
      id: id ?? Date.now(),
      fields: matchers,
    },
  });
}

export async function linkEmail({id, version, email, isLead}) {
  return updateEmail({email, ...(isLead ? {} : {partner: {id}})}).then(res => {
    if (!isLead) {
      return res;
    }

    const body = {
      id,
      version,
      emailAddress: res?.data?.data?.[0],
    };

    const {matchers, formattedData} = formatRequestBody(body, 'data');

    return getActionApi().send({
      url: '/ws/rest/com.axelor.apps.crm.db.Lead',
      method: 'post',
      body: {data: formattedData},
      description: 'update email address',
      matchers: {
        modelName: 'com.axelor.apps.crm.db.Lead',
        id,
        fields: matchers,
      },
    });
  });
}

export async function updatePartner({
  id,
  version,
  mobilePhone,
  fixedPhone,
  webSite,
}) {
  const body = {
    id,
    version,
    mobilePhone,
    fixedPhone,
    webSite,
  };
  const {matchers, formattedData} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.base.db.Partner',
    method: 'post',
    body: {data: formattedData},
    description: 'update partner',
    matchers: {
      modelName: 'com.axelor.apps.base.db.Partner',
      id,
      fields: matchers,
    },
  });
}
