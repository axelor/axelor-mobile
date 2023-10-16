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

import {Color} from '@axelor/aos-mobile-ui';

interface Anomaly {
  version: number;
  message: string;
  checkType: string;
  modelName: string;
}

export function filterAnomaly(anomalyList: Anomaly[]) {
  const BEFORE = -1;
  const EQUAL = 0;
  const AFTER = 1;

  return anomalyList.sort((a, b) => {
    if (a.checkType === b.checkType) {
      return EQUAL;
    } else if (a.checkType === 'error' && b.checkType === 'alert') {
      return BEFORE;
    } else {
      return AFTER;
    }
  });
}

interface Chip {
  isActive?: boolean;
  color: Color;
  title: string;
  key: string | number;
}

export function filterChip(
  listToFilter: any[],
  listSelectedChip: Chip[],
  objectParam: string,
) {
  if (!Array.isArray(listToFilter) || listToFilter.length === 0) {
    return [];
  }

  if (!Array.isArray(listSelectedChip) || listSelectedChip.length === 0) {
    return listToFilter;
  }

  return listToFilter.filter(item => {
    return listSelectedChip.find(chip => chip?.key === item[objectParam]);
  });
}
