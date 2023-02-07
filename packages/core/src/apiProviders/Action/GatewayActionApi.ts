import {ActionApi} from './ActionApiProvider';
import {ActionRequest} from './utils';

function getAvailableActionApi(actionsApi: ActionApi[]): ActionApi {
  const actionApi: ActionApi = actionsApi.find(item => {
    return item.isAvailable();
  });
  if (actionApi == null) {
    throw new Error('No provider available, please check your configuration.');
  }
  return actionApi;
}

export class GatewayActionApi implements ActionApi {
  private actionsApi: ActionApi[];

  constructor(...actionsApi: ActionApi[]) {
    this.actionsApi = actionsApi;
  }

  isAvailable(): Promise<boolean> {
    const actionApi: ActionApi = getAvailableActionApi(this.actionsApi);
    if (actionApi == null) {
      throw new Error(
        'No provider available, please check your configuration.',
      );
    }
    return actionApi.isAvailable();
  }

  send(request: ActionRequest): Promise<void> {
    return getAvailableActionApi(this.actionsApi).send(request);
  }
}
