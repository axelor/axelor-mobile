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

import axios, {AxiosRequestConfig} from 'axios';

interface ApiCallProps {
  url: string;
  data?: any;
  // Options given to axios for this call only, such as a timeout.
  config?: AxiosRequestConfig;
}

export interface ApiProvider {
  post({url, data, config}: ApiCallProps): Promise<any>;
  put({url, data, config}: ApiCallProps): Promise<any>;
  get({url, config}: ApiCallProps): Promise<any>;
  delete({url, config}: ApiCallProps): Promise<any>;
}

class AxiosApiProvider implements ApiProvider {
  constructor() {}

  post({url, data, config}: ApiCallProps): Promise<any> {
    return axios.post(url, data, config);
  }

  put({url, data, config}: ApiCallProps): Promise<any> {
    return axios.put(url, data, config);
  }

  get({url, config}: ApiCallProps): Promise<any> {
    return axios.get(url, config);
  }

  delete({url, config}: ApiCallProps): Promise<any> {
    return axios.delete(url, config);
  }
}

export const axiosApiProvider = new AxiosApiProvider();
