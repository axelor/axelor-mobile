/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {checkNullString} from '../utils';
import {
  ActionType,
  HeaderActions,
  HeaderBandItem,
  HeaderOptions,
} from './types';

const HEADER_DEFAULT_HEIGHT = 56;
const HEADER_BAND_HEIGHT = 34;

export const mergeActions = (
  currentActions: ActionType[],
  newActions: ActionType[],
) => {
  if (!Array.isArray(newActions) || newActions.length === 0) {
    return currentActions;
  }

  if (!Array.isArray(currentActions) || currentActions.length === 0) {
    return newActions;
  }

  const resultActions = [...currentActions];

  newActions.forEach(action => {
    const index = resultActions.findIndex(
      _current => _current.key === action.key,
    );
    if (index !== -1) {
      resultActions.splice(index, 1);
    }

    resultActions.push(action);
  });

  const actionsWithOrder = resultActions.map((_action, index) => {
    if (_action.order != null) {
      return _action;
    }

    return {..._action, order: index * 10};
  });

  return actionsWithOrder.sort((a, b) => a.order - b.order);
};

export const fetchOptionsOfHeaderKey = (
  headerActions: HeaderActions = {},
  key: string,
): HeaderOptions => {
  if (checkNullString(key)) {
    return null;
  }

  if (!Object.keys(headerActions).includes(key)) {
    return null;
  }

  return headerActions[key];
};

export const fetchFilteredHeaderBands = (
  headerBands: HeaderBandItem[],
): HeaderBandItem[] => {
  return headerBands
    .filter(band => band.showIf)
    .sort((a, b) => a.order - b.order);
};

export const getHeaderHeight = (filteredHeaderBands: HeaderBandItem[]) => {
  return (
    HEADER_DEFAULT_HEIGHT + filteredHeaderBands.length * HEADER_BAND_HEIGHT
  );
};
