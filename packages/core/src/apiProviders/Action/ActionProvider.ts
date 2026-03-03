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

import {useMemo} from 'react';
import {ActionApi} from './ActionApiProvider';
import {AosActionApi} from './AosActionApi';

class ActionProvider {
  constructor(private actionApi: ActionApi) {
    this.actionApi = actionApi;
  }

  setActionApi(newActionApi: ActionApi) {
    this.actionApi = newActionApi;
  }

  getActionApi(): ActionApi {
    return this.actionApi;
  }
}

export function useActionApi(): ActionApi {
  return useMemo(() => actionProvider.getActionApi(), []);
}

export function getActionApi(): ActionApi {
  return actionProvider.getActionApi();
}

export function registerActionApi(actionApi: ActionApi) {
  actionProvider.setActionApi(actionApi);
}

export const actionProvider = new ActionProvider(new AosActionApi());
