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

import {ModelApi} from './ModelApiProvider';
import {Query} from './utils';

function getAvailableModelApi(modelsApi: ModelApi[]): ModelApi {
  const modelApi: ModelApi = modelsApi.find(item => {
    return item.isAvailable();
  });
  if (modelApi == null) {
    throw new Error('No provider available, please check your configuration.');
  }
  return modelApi;
}

export class GatewayModelApi implements ModelApi {
  private modelsApi: ModelApi[];

  constructor(...modelsApi: ModelApi[]) {
    this.modelsApi = modelsApi;
  }

  init(): void {
    getAvailableModelApi(this.modelsApi)?.init();
  }

  isAvailable(): Promise<boolean> {
    const modelApi: ModelApi = getAvailableModelApi(this.modelsApi);
    if (modelApi == null) {
      throw new Error(
        'No provider available, please check your configuration.',
      );
    }
    return modelApi.isAvailable();
  }

  get({modelName, id}: {modelName: string; id: number}): Promise<any[]> {
    return getAvailableModelApi(this.modelsApi).get({modelName, id});
  }

  getAll({modelName, page}: {modelName: string; page: number}): Promise<any[]> {
    return getAvailableModelApi(this.modelsApi).getAll({modelName, page});
  }

  search({
    modelName,
    query,
  }: {
    modelName: string;
    query: Query;
  }): Promise<any[]> {
    return getAvailableModelApi(this.modelsApi).search({modelName, query});
  }
}
