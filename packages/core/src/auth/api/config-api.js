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

import {axiosApiProvider} from '../../apiProviders';
import {RouterProvider} from '../../config';

export async function getBaseConfig() {
  const route = await RouterProvider.get('AppBase');

  return axiosApiProvider.get({url: route});
}

export async function getMobileSettings() {
  const route = await RouterProvider.get('AppMobileSettings');

  return axiosApiProvider.get({url: route}).then(res => {
    if (res?.data?.status !== 0) {
      return {
        data: {
          data: [
            {
              isTrackerMessageEnabled: true,
              isVerifyCustomerDeliveryLineEnabled: false,
              isVerifyInventoryLineEnabled: false,
              isVerifySupplierArrivalLineEnabled: false,
              isVerifyInternalMoveLineEnabled: false,
            },
          ],
        },
      };
    }
    return res;
  });
}
