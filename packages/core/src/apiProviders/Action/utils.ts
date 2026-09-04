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

import {checkNullString} from '@axelor/aos-mobile-ui';

type Method = 'put' | 'post' | 'delete' | 'get';

export type ActionRequest = {
  url: string;
  method: Method;
  body: any;
  description: string;
  matchers?: MatcherConfig;
  ignoreRequest?: boolean;
};

export type MatcherConfig = {
  modelName: string;
  id: number;
  fields: FieldMatcher;
};

export type FieldMatcher = {
  [requestFieldName: string]: string;
};

export type ActionMessageType = 'error' | 'alert' | 'info' | 'notify';

const ACTION_MESSAGE_TYPES_BY_SEVERITY: ActionMessageType[] = [
  'error',
  'alert',
  'info',
  'notify',
];

export const getActionMessage = (
  response: any,
): {type: ActionMessageType; message: string} | null => {
  const actionResult = response?.data?.data?.[0];

  for (const type of ACTION_MESSAGE_TYPES_BY_SEVERITY) {
    const message = actionResult?.[type]?.message;

    if (!checkNullString(message)) return {type, message};
  }

  return null;
};
