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

import {Dimensions} from 'react-native';
import {Column} from './type';

const COLUMN_DEFAULT_WIDTH = 70;

export const computeColumnWidth = (
  columns: Column[],
  transparent: boolean,
  containerWidth?: number,
): number => {
  if (!Array.isArray(columns) || columns.length === 0) {
    return COLUMN_DEFAULT_WIDTH;
  }
  const fixedTotal = columns.reduce(
    (sum, c) => sum + (c.width != null ? c.width : 0),
    0,
  );
  const flexCount = columns.filter(c => c.width == null).length;
  if (flexCount === 0) return COLUMN_DEFAULT_WIDTH;
  const base = containerWidth ?? Dimensions.get('window').width;
  const usableWidth = transparent ? base : base * 0.85;
  const width = (usableWidth - fixedTotal) / flexCount;
  return width < COLUMN_DEFAULT_WIDTH ? COLUMN_DEFAULT_WIDTH : width;
};

export const computeColumnScale = (
  columns: Column[],
  transparent: boolean,
  containerWidth: number,
): number => {
  const defaultWidth = computeColumnWidth(columns, transparent, containerWidth);
  const total = columns.reduce((sum, c) => sum + (c.width ?? defaultWidth), 0);
  return total > 0 && total < containerWidth ? containerWidth / total : 1;
};
