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
