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

interface ApiCallProps {
  url: string;
  data?: any;
}

export interface ApiProvider {
  post({url, data}): Promise<any>;
  put({url, data}): Promise<any>;
  get({url}): Promise<any>;
  delete({url}): Promise<any>;
}

class AxiosApiProvider implements ApiProvider {
  constructor() {}

  post({url, data}: ApiCallProps): Promise<any> {
    return axios.post(url, data);
  }

  put({url, data}: ApiCallProps): Promise<any> {
    return axios.put(url, data);
  }

  get({url}: ApiCallProps): Promise<any> {
    return axios.get(url);
  }

  delete({url}: ApiCallProps): Promise<any> {
    return axios.delete(url);
  }
}

export const axiosApiProvider = new AxiosApiProvider();
