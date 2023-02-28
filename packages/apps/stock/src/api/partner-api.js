/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {axiosApiProvider, getObjectFields} from '@axelor/aos-mobile-core';

export async function searchSuppliersFilter({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner/search',
    data: {
      data: {
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
                fieldName: 'isSupplier',
                operator: '=',
                value: true,
              },
              {
                operator: 'or',
                criteria: [
                  {
                    fieldName: 'fullName',
                    operator: 'like',
                    value: searchValue,
                  },
                  {
                    fieldName: 'partnerSeq',
                    operator: 'like',
                    value: searchValue,
                  },
                  {
                    fieldName: 'name',
                    operator: 'like',
                    value: searchValue,
                  },
                  {
                    fieldName: 'firstName',
                    operator: 'like',
                    value: searchValue,
                  },
                  {
                    fieldName: 'simpleFullName',
                    operator: 'like',
                    value: searchValue,
                  },
                ],
              },
            ],
          },
        ],
      },
      fields: getObjectFields('stock_partner'),
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function searchClientsFilter({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner/search',
    data: {
      data: {
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
                operator: 'or',
                criteria: [
                  {
                    fieldName: 'isCustomer',
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
              {
                operator: 'or',
                criteria: [
                  {
                    fieldName: 'fullName',
                    operator: 'like',
                    value: searchValue,
                  },
                  {
                    fieldName: 'partnerSeq',
                    operator: 'like',
                    value: searchValue,
                  },
                  {
                    fieldName: 'name',
                    operator: 'like',
                    value: searchValue,
                  },
                  {
                    fieldName: 'firstName',
                    operator: 'like',
                    value: searchValue,
                  },
                  {
                    fieldName: 'simpleFullName',
                    operator: 'like',
                    value: searchValue,
                  },
                ],
              },
            ],
          },
        ],
      },
      fields: getObjectFields('stock_partner'),
      limit: 10,
      offset: 10 * page,
    },
  });
}
