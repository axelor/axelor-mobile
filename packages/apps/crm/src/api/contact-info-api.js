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

async function getAddress({country, city, zip, streetName}) {
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

      await getActionApi().send({
        url: '/ws/rest/com.axelor.apps.base.db.PartnerAddress',
        method: 'post',
        body: {
          data: {
            id: _partnerAddress?.id,
            version: _partnerAddress?.version,
            address: resAddress.data?.object,
          },
        },
        description: 'update partner address',
        matchers: {
          modelName: 'com.axelor.apps.base.db.PartnerAddress',
          id: _partnerAddress?.id,
          fields: {
            'data.address': 'address',
          },
        },
      });
    }

    const modelName = isLead
      ? 'com.axelor.apps.crm.db.Lead'
      : 'com.axelor.apps.base.db.Partner';
    const body = {
      id,
      version,
      [isLead ? 'address' : 'mainAddress']: resAddress.data?.object,
    };
    const {matchers} = formatRequestBody(body, 'data');
    return getActionApi().send({
      url: `/ws/rest/${modelName}`,
      method: 'post',
      body: {
        data: body,
      },
      description: 'update address',
      matchers: {
        modelName: modelName,
        id,
        fields: matchers,
      },
    });
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

export async function updateEmail({id, version, email}) {
  const route = await RouterProvider.get('EmailAddress');

  const modelName = route.replace('/ws/rest/', '');

  return getActionApi().send({
    url: route,
    method: 'post',
    body: {
      data: {
        id,
        version,
        address: email,
      },
    },
    description: 'update email',
    matchers: {
      modelName: modelName,
      id,
      fields: {
        'data.address': 'address',
      },
    },
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
  const {matchers} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.base.db.Partner',
    method: 'post',
    body: {
      data: body,
    },
    description: 'update partner',
    matchers: {
      modelName: 'com.axelor.apps.base.db.Partner',
      id,
      fields: matchers,
    },
  });
}
