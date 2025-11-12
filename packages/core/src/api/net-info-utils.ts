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

import {axiosApiProvider} from '../apiProviders';

interface NetInfoState {
  isConnected: boolean;
}

export async function getNetInfo(): Promise<NetInfoState> {
  return axiosApiProvider
    .get({url: '/ws/app/info'})
    .then(res => ({isConnected: res?.status === 200}))
    .catch(err => {
      const _status = err?.response?.status;

      if (!_status) {
        // User is not yet connected to a ERP instance
        // So, path to get network info is incomplete and previous request was skipped
        // We need to check google network to know if user is connected
        return axiosApiProvider
          .get({url: 'https://www.google.com'})
          .then(res => ({isConnected: res?.status === 200}))
          .catch(() => ({isConnected: false}));
      }

      return {isConnected: false};
    });
}

interface TokenInfoState {
  isTokenValid: boolean;
}

export async function getTokenInfo(): Promise<TokenInfoState> {
  return axiosApiProvider
    .get({url: '/'})
    .then(res => {
      if (
        typeof res?.data === 'string' &&
        res.data.includes('<form id="login-form"')
      ) {
        return {isTokenValid: false};
      }
      return {isTokenValid: res?.status !== 401};
    })
    .catch(error => {
      return {isTokenValid: error?.response?.status !== 401};
    });
}
