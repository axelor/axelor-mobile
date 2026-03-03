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

import {ModelApi} from './ModelApiProvider';
import {Query, ReadOptions, RequestResponse} from './utils';

async function getAvailableModelApi(modelsApi: ModelApi[]): Promise<ModelApi> {
  for (const _modelApi of modelsApi) {
    const availability = await _modelApi.isAvailable();

    if (availability) {
      return _modelApi;
    }
  }

  throw new Error('No provider available, please check your configuration.');
}

export class GatewayModelApi implements ModelApi {
  private modelsApi: ModelApi[];

  constructor(...modelsApi: ModelApi[]) {
    this.modelsApi = modelsApi;
  }

  async init(data?: any): Promise<void> {
    for (const _modelApi of this.modelsApi) {
      _modelApi.init(data);
    }
  }

  async isAvailable(): Promise<boolean> {
    const _modelApi: ModelApi = await getAvailableModelApi(this.modelsApi);

    return _modelApi.isAvailable();
  }

  async get({
    modelName,
    id,
  }: {
    modelName: string;
    id: number;
  }): Promise<RequestResponse> {
    const _modelApi: ModelApi = await getAvailableModelApi(this.modelsApi);

    return _modelApi.get({modelName, id});
  }

  async getAll({
    modelName,
    page,
  }: {
    modelName: string;
    page: number;
  }): Promise<RequestResponse> {
    const _modelApi: ModelApi = await getAvailableModelApi(this.modelsApi);

    return _modelApi.getAll({modelName, page});
  }

  async fetch({
    modelName,
    id,
    query,
  }: {
    modelName: string;
    id: number;
    query: ReadOptions;
  }): Promise<RequestResponse> {
    const _modelApi: ModelApi = await getAvailableModelApi(this.modelsApi);

    return _modelApi.fetch({modelName, id, query});
  }

  async search({
    modelName,
    query,
  }: {
    modelName: string;
    query: Query;
  }): Promise<RequestResponse> {
    const _modelApi: ModelApi = await getAvailableModelApi(this.modelsApi);

    return _modelApi.search({modelName, query});
  }

  async insert({
    modelName,
    id,
    data,
  }: {
    modelName: string;
    id: number;
    data: any;
  }): Promise<any> {
    const _modelApi: ModelApi = await getAvailableModelApi(this.modelsApi);

    return _modelApi.insert({modelName, id, data});
  }

  async reset(modelName?: string): Promise<void> {
    for (const _modelApi of this.modelsApi) {
      _modelApi.reset(modelName);
    }
  }
}
