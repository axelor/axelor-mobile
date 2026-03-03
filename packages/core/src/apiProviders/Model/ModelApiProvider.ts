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

import {Query, ReadOptions, RequestResponse} from './utils';

export interface ModelApi {
  init(data?: any): void;
  isAvailable(): Promise<boolean>;
  getAll({
    modelName,
    page,
  }: {
    modelName: string;
    page: number;
  }): Promise<RequestResponse>;
  get({
    modelName,
    id,
  }: {
    modelName: string;
    id: number;
  }): Promise<RequestResponse>;
  fetch({
    modelName,
    id,
    query,
  }: {
    modelName: string;
    id: number;
    query: ReadOptions;
  }): Promise<RequestResponse>;
  search({
    modelName,
    query,
  }: {
    modelName: string;
    query: Query;
  }): Promise<RequestResponse>;
  insert({
    modelName,
    id,
    data,
  }: {
    modelName: string;
    id: number;
    data: any;
  }): Promise<any>;
  reset(modelName?: string): void;
}
