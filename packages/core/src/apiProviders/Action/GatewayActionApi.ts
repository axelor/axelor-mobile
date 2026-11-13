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

import {
  ActionApi,
  ActionApiCredentials,
  UploadedMetaFile,
  UploadFile,
} from './ActionApiProvider';
import {ActionRequest} from './utils';

async function getAvailableActionApi(
  actionsApi: ActionApi[],
): Promise<ActionApi> {
  for (const _actionApi of actionsApi) {
    const availability = await _actionApi.isAvailable();

    if (availability) {
      return _actionApi;
    }
  }

  throw new Error('No provider available, please check your configuration.');
}

export class GatewayActionApi implements ActionApi {
  private actionsApi: ActionApi[];

  constructor(...actionsApi: ActionApi[]) {
    this.actionsApi = actionsApi;
  }

  init(credentials: ActionApiCredentials): void {
    this.actionsApi.forEach(_actionApi => _actionApi.init(credentials));
  }

  reset(): void {
    this.actionsApi.forEach(_actionApi => _actionApi.reset());
  }

  async isAvailable(): Promise<boolean> {
    const _actionApi: ActionApi = await getAvailableActionApi(this.actionsApi);

    return _actionApi.isAvailable();
  }

  async resolvePending(request: ActionRequest): Promise<ActionRequest | null> {
    let resolvedRequest: ActionRequest | null = request;

    for (const _actionApi of this.actionsApi) {
      resolvedRequest = await _actionApi.resolvePending(resolvedRequest);

      if (resolvedRequest == null) {
        return null;
      }
    }

    return resolvedRequest;
  }

  async send(request: ActionRequest): Promise<void> {
    let resolvedRequest = request;

    for (const _actionApi of this.actionsApi) {
      const result = await _actionApi.resolvePending(resolvedRequest);

      if (result == null) {
        return _actionApi.send(resolvedRequest);
      }

      resolvedRequest = result;
    }

    const _actionApi: ActionApi = await getAvailableActionApi(this.actionsApi);

    return _actionApi.send(resolvedRequest);
  }

  async upload(file: UploadFile): Promise<UploadedMetaFile> {
    const _actionApi: ActionApi = await getAvailableActionApi(this.actionsApi);

    return _actionApi.upload(file);
  }

  async synchronize(onEnd?: () => void): Promise<void> {
    for (const _actionApi of this.actionsApi) {
      _actionApi.synchronize(onEnd);
    }
  }
}
