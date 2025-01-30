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

import axios from 'axios';
import {
  fieldsParserMiddleware,
  provider,
  translationMiddleware,
} from '../apiProviders';

const loginPath = '/callback';

export async function loginApi(
  url: string,
  username: string,
  password: string,
): Promise<{
  token: string;
  jsessionId: string;
  requestInterceptorId: number;
  responseInterceptorId: number;
}> {
  return axios
    .post(`${url}${loginPath}`, {username, password})
    .then(response => {
      const token = response.headers['x-csrf-token'];
      const jsessionId = response.headers['set-cookie'][0].split(';')[0];
      if (token == null) {
        throw new Error('X-CSRF-Token is not exposed in remote header');
      }

      const requestInterceptorId = axios.interceptors.request.use(config => {
        config.baseURL = url;
        config.headers['x-csrf-token'] = token;
        return config;
      });

      const responseInterceptorId = axios.interceptors.response.use(_response =>
        fieldsParserMiddleware(translationMiddleware(_response)),
      );

      provider.getModelApi()?.init();

      return {token, jsessionId, requestInterceptorId, responseInterceptorId};
    });
}

export async function getActiveUserInfo() {
  const response = await axios.get('/ws/app/info');
  return {
    userId: response.data['user.id'],
    applicationMode: response.data['application.mode'],
  };
}
