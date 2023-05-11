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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {HeaderActions, HeaderOptions} from './types';
import {fetchOptionsOfHeaderKey, mergeActions} from './utils';

class HeaderActionsProvider {
  private headerActions: HeaderActions;
  private refreshCallBack: Function;

  constructor() {
    this.headerActions = {};
    this.refreshCallBack = () => {};
  }

  register(callBack) {
    this.refreshCallBack = callBack;
  }

  private updateState() {
    this.refreshCallBack(this.headerActions);
  }

  registerModel(key: string, options: HeaderOptions) {
    if (!Object.keys(this.headerActions).includes(key)) {
      this.headerActions[key] = options;
    } else {
      const oldOptions = {...this.headerActions[key]};
      this.headerActions[key] = {
        ...oldOptions,
        ...options,
        actions: mergeActions(oldOptions.actions, options.actions),
      };
    }
    this.updateState();
  }

  getHeaderOptions(key: string): HeaderOptions {
    return fetchOptionsOfHeaderKey(this.headerActions, key);
  }
}

export const headerActionsProvider = new HeaderActionsProvider();

export const useHeaderOptions = (modelKey: string) => {
  const [header, setHeader] = useState();

  useEffect(() => {
    headerActionsProvider.register(setHeader);
  }, []);

  const getHeaderOptionsOfModel = useCallback(
    key => fetchOptionsOfHeaderKey(header, key),
    [header],
  );

  return useMemo(
    () => ({options: getHeaderOptionsOfModel(modelKey)}),
    [getHeaderOptionsOfModel, modelKey],
  );
};
