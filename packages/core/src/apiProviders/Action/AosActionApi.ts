import axios from 'axios';
import {getNetInfo} from '../../api/net-info-utils';
import {ActionApi} from './ActionApiProvider';
import {ActionRequest} from './utils';

export class AosActionApi implements ActionApi {
  constructor() {}

  static isOnlineAvailable = true;

  async isAvailable(): Promise<boolean> {
    if (AosActionApi.isOnlineAvailable) {
      const {isConnected} = await getNetInfo();
      return isConnected;
    }
    return AosActionApi.isOnlineAvailable;
  }

  send(request: ActionRequest): Promise<void> {
    return axios[request.method](request.url, request.body);
  }
}
