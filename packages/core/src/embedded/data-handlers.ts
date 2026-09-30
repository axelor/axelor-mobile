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

import axios from 'axios';
import {getActionApi} from '../apiProviders/Action';
import {AopModelApi, getModelApi} from '../apiProviders/Model';
import {getNetInfo} from '../api/net-info-utils';
import {Query, ReadOptions} from '../apiProviders/Model/utils';
import {axiosApiProvider} from '../apiProviders/Standard';
import type {DataRecord} from '@axelor/app-bridge';
import {HostError, errorFromEnvelope, errorFromHttpStatus} from './protocol';

type Params = Record<string, unknown>;

export type BridgeHandlerContext = {
  /* The user's online mode; reachability is checked per call by requireOnline */
  online: boolean;
};

export type BridgeHandler = (
  params: Params,
  context: BridgeHandlerContext,
) => Promise<unknown>;

const handlers = new Map<string, BridgeHandler>();

/*
 * Adds or replaces a method that embedded apps can call through @axelor/app-bridge.
 * Modules use it for their own methods (declared in HostMethods on the app side).
 */
export function registerAppBridgeHandler(
  method: string,
  handler: BridgeHandler,
) {
  handlers.set(method, handler);
}

export function getAppBridgeHandler(method: string): BridgeHandler | null {
  return handlers.get(method) ?? null;
}

export function getAppBridgeMethods(): string[] {
  return Array.from(handlers.keys());
}

function readString(params: Params, key: string): string {
  const value = params[key];
  if (typeof value !== 'string' || value.length === 0) {
    throw new HostError('validation', `Missing string parameter "${key}"`);
  }
  return value;
}

function readNumber(params: Params, key: string): number {
  const value = params[key];
  if (typeof value !== 'number') {
    throw new HostError('validation', `Missing number parameter "${key}"`);
  }
  return value;
}

/* Same check AopModelApi makes: online mode on and AOS reachable */
async function requireOnline(context: BridgeHandlerContext, method: string) {
  const reachable =
    context.online &&
    AopModelApi.isOnlineAvailable &&
    (await getNetInfo()).isConnected;
  if (!reachable) {
    throw new HostError('offline', `${method} needs a connection to AOS`);
  }
}

type Envelope = {
  status?: number;
  offset?: number;
  total?: number;
  data?: unknown;
  errors?: Record<string, string>;
};

type AxiosLikeError = {
  message?: string;
  response?: {status?: number};
};

function toHostError(error: unknown, online: boolean): HostError {
  if (error instanceof HostError) {
    return error;
  }
  const axiosError = error as AxiosLikeError;
  const message = axiosError?.message ?? String(error);
  const status = axiosError?.response?.status;
  if (status == null) {
    return new HostError(online ? 'network' : 'offline', message);
  }
  return errorFromHttpStatus(status, message);
}

/*
 * Online, ModelApi returns the axios response ({data: envelope}).
 * Offline (StorageModelApi), it returns {data: {data: records}} with no status.
 */
function readEnvelope(response: unknown): Envelope {
  const envelope = ((response as {data?: Envelope})?.data ?? {}) as Envelope;
  if (envelope.status != null && envelope.status !== 0) {
    throw errorFromEnvelope(envelope);
  }
  return envelope;
}

function readRecords(response: unknown): DataRecord[] {
  const {data} = readEnvelope(response);
  return Array.isArray(data) ? (data as DataRecord[]) : [];
}

function identityMatcher(record: DataRecord): Record<string, string> {
  return Object.keys(record).reduce<Record<string, string>>(
    (matcher, fieldName) => ({...matcher, [fieldName]: fieldName}),
    {},
  );
}

type SearchOptions = {
  filter?: Query['data'];
  fields?: string[];
  sortBy?: string[];
  offset?: number;
  limit?: number;
  translate?: boolean;
};

/*
 * Saves go through the ActionApi so they are queued while offline. A queued save
 * has no server answer, so the record is returned as sent.
 */
async function sendSave(
  modelName: string,
  body: {data: DataRecord} | {records: DataRecord[]},
  records: DataRecord[],
): Promise<DataRecord[]> {
  const single = records.length === 1 ? records[0] : null;
  const response = await getActionApi().send({
    url: `ws/rest/${modelName}`,
    method: 'post',
    body,
    description: `save ${modelName} from an embedded app`,
    matchers:
      typeof single?.id === 'number'
        ? {modelName, id: single.id, fields: identityMatcher(single)}
        : undefined,
  });
  const envelope = readEnvelope(response);
  return Array.isArray(envelope.data) && envelope.status === 0
    ? (envelope.data as DataRecord[])
    : records;
}

const defaultHandlers: Record<string, BridgeHandler> = {
  'data.search': async params => {
    const modelName = readString(params, 'model');
    const {filter, ...options} = (params.options ?? {}) as SearchOptions;
    const query: Query = {...options, data: filter ?? {criteria: []}};
    const response = await getModelApi().search({modelName, query});
    const envelope = readEnvelope(response);
    return {
      records: Array.isArray(envelope.data) ? envelope.data : [],
      page: {
        offset: envelope.offset ?? options.offset,
        limit: options.limit,
        totalCount: envelope.total,
      },
    };
  },

  'data.fetch': async params => {
    const modelName = readString(params, 'model');
    const id = readNumber(params, 'id');
    const query: ReadOptions = {
      fields: [],
      ...((params.options ?? {}) as Partial<ReadOptions>),
    };
    const response = await getModelApi().fetch({modelName, id, query});
    return readRecords(response)[0] ?? null;
  },

  'data.save': async params => {
    const modelName = readString(params, 'model');
    const record = (params.record ?? {}) as DataRecord;
    const [saved] = await sendSave(modelName, {data: record}, [record]);
    return saved ?? record;
  },

  'data.saveAll': async params => {
    const modelName = readString(params, 'model');
    const records = (params.records ?? []) as DataRecord[];
    return sendSave(modelName, {records}, records);
  },

  'data.delete': async params => {
    const modelName = readString(params, 'model');
    const records = (params.records ?? []) as DataRecord[];
    const response = await getActionApi().send({
      url: `ws/rest/${modelName}/removeAll`,
      method: 'post',
      body: {records},
      description: `delete ${modelName} from an embedded app`,
    });
    readEnvelope(response);
    return records.length;
  },

  'data.fields': async params => {
    const modelName = readString(params, 'model');
    const response = await getModelApi().getFields({modelName});
    return readEnvelope(response).data ?? null;
  },

  'data.action': async (params, context) => {
    await requireOnline(context, 'data.action');
    const response = await axiosApiProvider.post({
      url: 'ws/action',
      data: params,
    });
    return readRecords(response);
  },

  'http.request': async (params, context) => {
    await requireOnline(context, 'http.request');
    const method = String(params.method ?? 'GET').toLowerCase();
    const path = readString(params, 'path').replace(/^\/+/, '');
    /* Requests carry the user's session, so they only go to the AOS server */
    if (/^[a-z][a-z0-9+.-]*:/i.test(path)) {
      throw new HostError('forbidden', `${path} is outside the AOS server`);
    }
    const query = (params.query ?? {}) as Record<string, unknown>;
    const queryString = Object.entries(query)
      .filter(([, value]) => value != null)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
      )
      .join('&');
    const url =
      queryString.length > 0
        ? `${path}${path.includes('?') ? '&' : '?'}${queryString}`
        : path;
    if (!['get', 'post', 'put', 'delete'].includes(method)) {
      throw new HostError('validation', `Unsupported method ${method}`);
    }
    const response = await axios.request({
      url,
      method,
      data: method === 'get' ? undefined : params.body,
    });
    return response?.data ?? null;
  },
};

Object.entries(defaultHandlers).forEach(([method, handler]) =>
  registerAppBridgeHandler(method, handler),
);

export async function runAppBridgeHandler(
  method: string,
  params: Params,
  context: BridgeHandlerContext,
): Promise<unknown> {
  const handler = handlers.get(method);
  if (handler == null) {
    throw new HostError('unsupported', `${method} is not supported`);
  }
  try {
    return await handler(params, context);
  } catch (error) {
    const hasResponse = (error as AxiosLikeError)?.response != null;
    /* A request that got no answer: tell "device offline" from "AOS unreachable" */
    const online =
      error instanceof HostError || hasResponse
        ? context.online
        : context.online && (await getNetInfo()).isConnected;
    throw toHostError(error, online);
  }
}
