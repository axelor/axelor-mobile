/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import type {LoginResult} from '../sessions';
import {initAxiosWithHeaders} from './axios-init';

const LOGIN_PATH = 'callback';

const isMfaRouteResponse = (data: any): boolean => data?.route?.path === '/mfa';

export async function loginApi(
  url: string,
  username: string,
  password: string,
): Promise<LoginResult> {
  const res = await axios.post(`${url}${LOGIN_PATH}`, {username, password});

  if (isMfaRouteResponse(res.data)) {
    const state = res.data?.route?.state ?? {};
    return {
      kind: 'mfa',
      methods: Array.isArray(state.methods) ? state.methods : [],
      username: state.username ?? username,
      emailRetryAfter: state.emailRetryAfter,
    };
  }

  return {kind: 'session', ...initAxiosWithHeaders(res, url)};
}

export async function logoutApi() {
  return axios.get('/logout');
}

export async function getActiveUserInfo() {
  const response = await axios.get('/ws/public/app/info');
  return {
    userId: response?.data?.user?.id,
    applicationMode: response?.data?.application?.mode,
  };
}
