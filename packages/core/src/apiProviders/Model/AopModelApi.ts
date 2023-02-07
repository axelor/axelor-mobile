import axios from 'axios';
import {getNetInfo} from '../../api/net-info-utils';
import {ModelApi} from './ModelApiProvider';
import {Query, REQUEST_LIMIT} from './utils';

export class AopModelApi implements ModelApi {
  constructor() {}

  static isOnlineAvailable = true;

  init(): void {}

  async isAvailable(): Promise<boolean> {
    if (AopModelApi.isOnlineAvailable) {
      const {isConnected} = await getNetInfo();
      return isConnected;
    }
    return AopModelApi.isOnlineAvailable;
  }

  getAll({modelName, page}: {modelName: string; page: number}): Promise<any> {
    return axios.get(
      `ws/rest/${modelName}?offset=${
        page * REQUEST_LIMIT
      }&limit=${REQUEST_LIMIT}`,
    );
  }

  get({modelName, id}: {modelName: string; id: number}): Promise<any> {
    return axios.get(`ws/rest/${modelName}/${id}`);
  }

  search({modelName, query}: {modelName: string; query: Query}): Promise<any> {
    return axios.post(`ws/rest/${modelName}/search`, query);
  }
}
