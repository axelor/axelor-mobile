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

import {Color} from '@axelor/aos-mobile-ui';

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

export function filterChipCriteria(
  listSelectedChip: Chip[],
  criteriaFieldName: string,
) {
  const criteria = [];

  if (Array.isArray(listSelectedChip) && listSelectedChip?.length > 0) {
    listSelectedChip.forEach(chip => {
      criteria.push({
        fieldName: criteriaFieldName,
        operator: '=',
        value: chip?.key,
      });
    });
  }

  return {operator: 'OR', criteria};
}
