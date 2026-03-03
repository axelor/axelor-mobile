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

import {Color, ThemeColors} from '@axelor/aos-mobile-ui';
import {ProcessItem, ProcessStatus} from './types';

const serializeItem = (p: ProcessItem) => {
  return JSON.stringify(p);
};

const deserializeItem = (data: string) => {
  return JSON.parse(data);
};

export const serialize = (list: ProcessItem[]): string => {
  if (!Array.isArray(list) || list.length === 0) {
    return '[]';
  }

  return JSON.stringify(list.map(p => serializeItem(p)));
};

export const deserialize = (data: string) => {
  if (data == null || data.length === 0) {
    return [];
  }

  try {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map(i => deserializeItem(i));
  } catch (e) {
    console.error('Deserialization error:', e);
    return [];
  }
};

export const getProcessStatusColor = (
  status: ProcessStatus,
  Colors: ThemeColors,
): Color => {
  switch (status) {
    case ProcessStatus.InProgress:
      return Colors.progressColor;
    case ProcessStatus.Success:
      return Colors.successColor;
    case ProcessStatus.Failed:
      return Colors.errorColor;
    default:
      console.warn(
        `Status provided with value ${status} is not supported by Process.`,
      );
      return null;
  }
};
