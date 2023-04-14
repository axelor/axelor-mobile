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

import {axiosApiProvider} from '../../apiProviders';
import {RouterProvider} from '../../config';

export async function getBaseConfig() {
  return axiosApiProvider.get({
    url: RouterProvider.get('AppBase'),
  });
}

export async function getMobileSettings() {
  return axiosApiProvider
    .get({
      url: RouterProvider.get('AppMobileSettings'),
    })
    .then(res => {
      if (res?.data?.status !== 0) {
        return {
          data: {
            data: [
              {
                isTrackerMessageOnStockApp: true,
                isTrackerMessageOnProductionApp: true,
                isTrackerMessageOnCrmApp: true,
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
