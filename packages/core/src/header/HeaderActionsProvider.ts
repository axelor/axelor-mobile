/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

    this.refreshCallBack(key, this.headerActions[key]);
  }

  getHeaderOptions(key: string): HeaderOptions {
    return fetchOptionsOfHeaderKey(this.headerActions, key);
  }
}

export const headerActionsProvider = new HeaderActionsProvider();

export const useHeaderActions = (): {headers: HeaderActions} => {
  const [headers, setHeaders] = useState<HeaderActions>();

  const refreshData = useCallback((key: string, options: HeaderOptions) => {
    setHeaders(_current => {
      if (_current?.[key] === options) {
        return _current;
      }

      const updatedHeaders = _current != null ? {..._current} : {};

      updatedHeaders[key] = options;

      return updatedHeaders;
    });
  }, []);

  useEffect(() => {
    headerActionsProvider.register(refreshData);
  }, [refreshData]);

  return useMemo(() => ({headers}), [headers]);
};
