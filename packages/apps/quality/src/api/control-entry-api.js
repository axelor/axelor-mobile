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
  createStandardFetch,
  createStandardSearch,
  formatRequestBody,
  getActionApi,
  getEndOfDay,
  getSearchCriterias,
  getStartOfDay,
} from '@axelor/aos-mobile-core';

const createControlEntryCriteria = (
  searchValue,
  isInspector,
  userId,
  date,
  selectedStatus,
) => {
  const criteria = [getSearchCriterias('quality_controlEntry', searchValue)];

  if (isInspector && userId != null) {
    criteria.push({
      fieldName: 'inspector.id',
      operator: '=',
      value: userId,
    });
  }

  if (Array.isArray(selectedStatus) && selectedStatus.length > 0) {
    const statusCriteria = selectedStatus.map(_status => ({
      fieldName: 'statusSelect',
      operator: '=',
      value: _status.key,
    }));

    criteria.push({operator: 'OR', criteria: statusCriteria});
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
  isInspector = false,
  userId = null,
  date = null,
  selectedStatus = null,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.quality.db.ControlEntry',
    criteria: createControlEntryCriteria(
      searchValue,
      isInspector,
      userId,
      date,
      selectedStatus,
    ),
    fieldKey: 'quality_controlEntry',
    sortKey: 'quality_controlEntry',
    page: page,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function fetchControlEntryById({controlEntryId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.quality.db.ControlEntry',
    id: controlEntryId,
    fieldKey: 'quality_controlEntry',
    provider: 'model',
  });
}

export async function updateControlEntry({controlEntry}) {
  const {matchers, formattedData} = formatRequestBody(controlEntry, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.quality.db.ControlEntry/',
    method: 'post',
    body: {
      data: formattedData,
    },
    description: 'update control entry',
    matchers: {
      id: controlEntry.id,
      modelName: 'com.axelor.apps.quality.db.ControlEntry',
      fields: matchers,
    },
  });
}

export async function getProgressValues({
  controlEntryId,
  characteristicId,
  sampleId,
}) {
  return getActionApi().send({
    url: 'ws/aos/controlentry/progressValues',
    method: 'post',
    body: {
      controlEntryId,
      characteristicId,
      sampleId,
    },
    description: 'get progress values',
  });
}
