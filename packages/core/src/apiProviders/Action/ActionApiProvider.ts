import {ActionRequest} from './utils';

export interface ActionApi {
  isAvailable(): Promise<boolean>;
  send(request: ActionRequest): Promise<void>;
}
