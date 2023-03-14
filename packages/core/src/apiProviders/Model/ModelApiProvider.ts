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

import {Query, ReadOptions} from './utils';

export interface ModelApi {
  init(): void;
  isAvailable(): Promise<boolean>;
  getAll({modelName, page}: {modelName: string; page: number}): Promise<any[]>;
  get({modelName, id}: {modelName: string; id: number}): Promise<any[]>;
  fetch?({
    modelName,
    id,
    query,
  }: {
    modelName: string;
    id: number;
    query: ReadOptions;
  }): Promise<any[]>;
  search({modelName, query}: {modelName: string; query: Query}): Promise<any[]>;
}
