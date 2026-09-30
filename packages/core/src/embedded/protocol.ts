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
  BOOTSTRAP_GLOBAL,
  CHANNEL,
  RECEIVE_GLOBAL,
  type Bootstrap,
  type CallMessage,
  type HostToAppMessage,
} from '@axelor/app-bridge/protocol';

export {
  HostError,
  PROTOCOL_VERSION,
  errorFromEnvelope,
  errorFromHttpStatus,
} from '@axelor/app-bridge/protocol';
export type {
  Bootstrap,
  HostErrorCode,
  HostToAppMessage,
} from '@axelor/app-bridge/protocol';

/* A call from the page, with its params checked to be an object */
export type HostCall = Omit<CallMessage, 'params'> & {
  params: Record<string, unknown>;
};

export function parseCallMessage(raw: string): HostCall | null {
  try {
    const message = JSON.parse(raw) as Partial<CallMessage>;
    if (
      message?.channel === CHANNEL &&
      message.type === 'call' &&
      typeof message.id === 'string' &&
      typeof message.method === 'string'
    ) {
      return {
        channel: CHANNEL,
        protocol: Number(message.protocol),
        type: 'call',
        id: message.id,
        method: message.method,
        params: (message.params ?? {}) as Record<string, unknown>,
      };
    }
  } catch {
    return null;
  }
  return null;
}

export function createBootstrapScript(bootstrap: Bootstrap): string {
  return `window.${BOOTSTRAP_GLOBAL} = ${JSON.stringify(bootstrap)}; true;`;
}

export function createDeliveryScript(message: HostToAppMessage): string {
  return `window.${RECEIVE_GLOBAL} && window.${RECEIVE_GLOBAL}(${JSON.stringify(
    message,
  )}); true;`;
}
