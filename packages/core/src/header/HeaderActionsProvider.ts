import {useCallback, useEffect, useMemo, useState} from 'react';
import {checkNullString} from '../utils';
import {HeaderActions, HeaderOptions} from './types';
import {mergeActions} from './utils';

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
}

export const headerActionsProvider = new HeaderActionsProvider();

export const useHeaderOptions = (modelKey: string) => {
  const [header, setHeader] = useState({});

  useEffect(() => {
    headerActionsProvider.register(setHeader);
  }, []);

  const getHeaderOptionsOfModel = useCallback(() => {
    if (checkNullString(modelKey)) {
      return null;
    }

    if (!Object.keys(header).includes(modelKey)) {
      return null;
    }

    return header[modelKey];
  }, [header, modelKey]);

  return useMemo(
    () => ({options: getHeaderOptionsOfModel()}),
    [getHeaderOptionsOfModel],
  );
};
