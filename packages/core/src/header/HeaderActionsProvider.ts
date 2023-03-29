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

      this.updateState();
    }
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
