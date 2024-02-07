/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  createStandardFetch,
  createStandardSearch,
  getEndOfDay,
  getSearchCriterias,
  getStartOfDay,
} from '@axelor/aos-mobile-core';

const createControlEntryCriteria = (searchValue, isInspector, userId, date) => {
  const criteria = [getSearchCriterias('quality_controlEntry', searchValue)];

  if (isInspector && userId != null) {
    criteria.push({
      fieldName: 'inspector.id',
      operator: '=',
      value: userId,
    });
  }

  if (date != null) {
    criteria.push(
      {
        fieldName: 'entryDateTime',
        operator: '>=',
        value: getStartOfDay(date).toISOString(),
      },
      {
        fieldName: 'entryDateTime',
        operator: '<=',
        value: getEndOfDay(date).toISOString(),
      },
    );
  }

  return criteria;
};

export async function searchControlEntry({
  searchValue = null,
  page = 0,
  isInspector,
  userId,
  date,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.quality.db.ControlEntry',
    criteria: createControlEntryCriteria(
      searchValue,
      isInspector,
      userId,
      date,
    ),
    fieldKey: 'quality_controlEntry',
    sortKey: 'quality_controlEntry',
    page: page,
  });
}

export async function fetchControlEntryById({controlEntryId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.quality.db.ControlEntry',
    id: controlEntryId,
    fieldKey: 'quality_controlEntry',
  });
}

export async function updateControlEntry({controlEntry}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.quality.db.ControlEntry/',
    data: {
      data: controlEntry,
    },
  });
}
