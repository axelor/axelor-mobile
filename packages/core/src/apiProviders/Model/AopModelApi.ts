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
import {getNetInfo} from '../../api/net-info-utils';
import {ModelApi} from './ModelApiProvider';
import {Query, ReadOptions, RequestResponse, REQUEST_LIMIT} from './utils';

export class AopModelApi implements ModelApi {
  constructor() {}

  static isOnlineAvailable = true;

  init(): void {}
  reset(): void {}
  insert(): Promise<void> {
    return new Promise(resolve => {
      resolve();
    });
  }

  async isAvailable(): Promise<boolean> {
    const {isConnected} = await getNetInfo();

    return new Promise(resolve => {
      if (!AopModelApi.isOnlineAvailable) {
        resolve(false);
      } else {
        resolve(isConnected);
      }
    });
  }

  getAll({
    modelName,
    page,
  }: {
    modelName: string;
    page: number;
  }): Promise<RequestResponse> {
    return axios.get(
      `ws/rest/${modelName}?offset=${
        page * REQUEST_LIMIT
      }&limit=${REQUEST_LIMIT}`,
    );
  }

  get({
    modelName,
    id,
  }: {
    modelName: string;
    id: number;
  }): Promise<RequestResponse> {
    return axios.get(`ws/rest/${modelName}/${id}`);
  }

  fetch({
    modelName,
    id,
    query,
  }: {
    modelName: string;
    id: number;
    query: ReadOptions;
  }): Promise<RequestResponse> {
    return axios.post(`ws/rest/${modelName}/${id}/fetch`, query);
  }

  search({
    modelName,
    query,
  }: {
    modelName: string;
    query: Query;
  }): Promise<RequestResponse> {
    return axios.post(`ws/rest/${modelName}/search`, query);
  }
}
