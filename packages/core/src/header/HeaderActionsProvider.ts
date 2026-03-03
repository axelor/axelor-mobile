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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  GenericHeaderActions,
  HeaderActions,
  HeaderOptions,
  RegisterFunction,
} from './types';
import {fetchOptionsOfHeaderKey, mergeActions} from './utils';

class HeaderActionsProvider {
  private headerActions: HeaderActions;
  private headerGenericActions: GenericHeaderActions;
  private refreshCallBack: Function[];
  private refreshGenericCallBack: Function[];

  constructor() {
    this.headerActions = {};
    this.headerGenericActions = {};
    this.refreshCallBack = [];
    this.refreshGenericCallBack = [];
  }

  register(callBack) {
    this.refreshCallBack.push(callBack);
  }

  unregister(callBack) {
    this.refreshCallBack = this.refreshCallBack.filter(_f => _f !== callBack);
  }

  private updateState() {
    this.refreshCallBack.forEach(_f => _f(this.headerActions));
  }

  registerGeneric(callBack) {
    this.refreshGenericCallBack.push(callBack);
  }

  unregisterGeneric(callBack) {
    this.refreshGenericCallBack = this.refreshGenericCallBack.filter(
      _f => _f !== callBack,
    );
  }

  private updateGenericState() {
    this.refreshGenericCallBack.forEach(_f => _f(this.headerGenericActions));
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

  registerGenericAction(key: string, registerFunction: RegisterFunction) {
    this.headerGenericActions[key] = registerFunction;

    this.updateGenericState();
  }

  getHeaderOptions(key: string): HeaderOptions {
    return fetchOptionsOfHeaderKey(this.headerActions, key);
  }

  getAllHeaderActions(): HeaderActions {
    return this.headerActions;
  }

  getAllGenericHeaderActions(): GenericHeaderActions {
    return this.headerGenericActions;
  }
}

export const headerActionsProvider = new HeaderActionsProvider();

export const useHeaderActions = (
  actionID: string,
): {headers: HeaderOptions; genericHeaders: GenericHeaderActions} => {
  const [headers, setHeaders] = useState<HeaderActions>(
    headerActionsProvider.getAllHeaderActions(),
  );
  const [genericHeaders, setGenericHeaders] = useState<GenericHeaderActions>(
    headerActionsProvider.getAllGenericHeaderActions(),
  );

  useEffect(() => {
    headerActionsProvider.register(options => setHeaders({...options}));
    headerActionsProvider.registerGeneric(functions =>
      setGenericHeaders({...functions}),
    );

    return () => {
      headerActionsProvider.unregister(setHeaders);
      headerActionsProvider.unregisterGeneric(setGenericHeaders);
    };
  }, []);

  const getFormConfigOfModel = useCallback(
    key => fetchOptionsOfHeaderKey(headers, key),
    [headers],
  );

  return useMemo(
    () => ({headers: getFormConfigOfModel(actionID), genericHeaders}),
    [actionID, genericHeaders, getFormConfigOfModel],
  );
};
