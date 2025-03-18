/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  axiosApiProvider,
  createStandardSearch,
  Criteria,
} from '../apiProviders';

const createFetchMetaFiltersCriteria = ({filterName, userId}) => {
  return [
    {
      fieldName: 'filterView',
      operator: '=',
      value: filterName,
    },
    {
      operator: 'or',
      criteria: [
        {
          fieldName: 'shared',
          operator: '=',
          value: true,
        },
        {
          fieldName: 'user.id',
          operator: '=',
          value: userId,
        },
      ],
    },
  ];
};

export async function fetchDefaultFilters({modelName}: {modelName: string}) {
  return axiosApiProvider.post({
    url: `/ws/meta/view`,
    data: {
      data: {
        type: 'search-filters',
      },
      model: modelName,
    },
  });
}

export async function fetchMetaFilters({page = 0, filterName, userId}) {
  return createStandardSearch({
    model: 'com.axelor.meta.db.MetaFilter',
    criteria: createFetchMetaFiltersCriteria({
      filterName,
      userId,
    }) as Criteria[],
    fieldKey: 'core_metaFilter',
    page,
  });
}
