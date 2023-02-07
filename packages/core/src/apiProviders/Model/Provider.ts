import {useMemo} from 'react';
import {AopModelApi} from './AopModelApi';
import {ModelApi} from './ModelApiProvider';

class Provider {
  constructor(private modelApi: ModelApi) {
    this.modelApi = modelApi;
  }

  setModelApi(newModelApi: ModelApi) {
    this.modelApi = newModelApi;
  }

  getModelApi(): ModelApi {
    return this.modelApi;
  }
}

export function useModelApi(): ModelApi {
  return useMemo(() => provider.getModelApi(), []);
}

export function getModelApi(): ModelApi {
  return provider.getModelApi();
}

export function registerModelApi(modelApi: ModelApi) {
  provider.setModelApi(modelApi);
}

export const provider = new Provider(new AopModelApi());
