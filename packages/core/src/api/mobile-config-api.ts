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

import {axiosApiProvider} from '../axios/AxiosApi';

function emptyResponse() {
  return {data: {data: []}};
}

export async function getMobileConfigs() {
  return axiosApiProvider
    .post({
      url: '/ws/rest/com.axelor.apps.base.db.App/search',
      data: {
        data: {
          criteria: [
            {
              fieldName: 'code',
              operator: '=',
              value: 'mobile-settings',
            },
          ],
        },
        fields: ['active'],
      },
    })
    .then(res => {
      if (
        (res?.status === 0 || res?.status === 200) &&
        res?.data?.data?.[0].active
      ) {
        return axiosApiProvider
          .get({
            url: '/ws/rest/com.axelor.apps.mobilesettings.db.MobileConfig',
          })
          .then(_res => {
            if (_res?.status === 0 || _res?.status === 200) {
              return _res;
            }
            return emptyResponse();
          });
      }
      return emptyResponse();
    });
}
