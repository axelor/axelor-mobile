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
  createStandardSearch,
  RouterProvider,
} from '@axelor/aos-mobile-core';

async function searchPartnerAddress({partnerId, addressId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.PartnerAddress',
    criteria: [
      {
        fieldName: 'partner.id',
        operator: '=',
        value: partnerId,
      },
      {
        fieldName: 'address.id',
        operator: '=',
        value: addressId,
      },
    ],
    fieldKey: 'crm_partnerAddress',
    numberElementsByPage: 1,
    page: 0,
  });
}

export async function updateAddress({
  id,
  partnerId,
  country,
  city,
  zip,
  streetName,
}) {
  return axiosApiProvider
    .post({
      url: '/ws/aos/address',
      data: {
        country,
        city,
        zip,
        streetName,
      },
    })
    .then(async resAddress => {
      const resPartnerAdress = await searchPartnerAddress({
        partnerId,
        addressId: id,
      });

      return axiosApiProvider.post({
        url: '/ws/rest/com.axelor.apps.base.db.PartnerAddress',
        data: {
          data: {
            id: resPartnerAdress.data?.data?.[0]?.id,
            version: resPartnerAdress.data?.data?.[0]?.version,
            address: {id: resAddress.data?.object?.id},
          },
        },
      });
    });
}

export async function updateEmail({id, version, email}) {
  const route = await RouterProvider.get('EmailAddress');

  return axiosApiProvider.post({
    url: route,
    data: {
      data: {
        id,
        version,
        address: email,
      },
    },
  });
}

export async function updatePartner({
  id,
  version,
  mainAddress,
  mobilePhone,
  fixedPhone,
  webSite,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner',
    data: {
      data: {
        id,
        version,
        mainAddress,
        mobilePhone,
        fixedPhone,
        webSite,
      },
    },
  });
}
