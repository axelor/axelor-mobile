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

import {axiosApiProvider} from '../apiProviders';
import {RouterProvider} from '../config';

export async function getMobileConfigs() {
  const route = await RouterProvider.get('App');

  return axiosApiProvider
    .post({
      url: `${route}/search`,
      data: {
        data: {
          criteria: [
            {
              fieldName: 'code',
              operator: '=',
              value: 'mobile-settings',
            },
            {
              fieldName: 'active',
              operator: '=',
              value: true,
            },
          ],
        },
        fields: ['id'],
      },
    })
    .then(res => {
      if (Array.isArray(res?.data?.data) && res?.data?.data?.length > 0) {
        return axiosApiProvider.get({
          url: '/ws/rest/com.axelor.apps.mobilesettings.db.MobileConfig',
        });
      }

      return {data: {data: []}};
    });
}
