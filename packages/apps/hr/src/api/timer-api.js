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

import {
  createStandardFetch,
  createStandardSearch,
  getActionApi,
  getDateZonesISOString,
  getEndOfDay,
  getSearchCriterias,
  getStartOfDay,
  getTypes,
} from '@axelor/aos-mobile-core';

const createTimerCriteria = (searchValue, userId, fromDate, toDate) => {
  const criteria = [
    getSearchCriterias('hr_timer', searchValue),
    {
      fieldName: 'employee.user.id',
      operator: '=',
      value: userId,
    },
    {
      fieldName: 'timesheetLine.timesheet',
      operator: 'isNull',
    },
  ];

  if (fromDate != null && toDate != null) {
    const _fromDate = getStartOfDay(fromDate).toISOString();
    const _toDate = getEndOfDay(toDate).toISOString();

    criteria.push({
      operator: 'and',
      criteria: [
        {
          fieldName: 'startDateTime',
          operator: '>=',
          value: _fromDate,
        },
        {
          fieldName: 'startDateTime',
          operator: '<=',
          value: _toDate,
        },
      ],
    });
  }

  return criteria;
};

const createActiveTimerCriteria = userId => {
  const Timer = getTypes().Timer;

  const criteria = createTimerCriteria(null, userId);

  criteria.push({
    operator: 'OR',
    criteria: [
      {
        fieldName: 'statusSelect',
        operator: '=',
        value: Timer?.statusSelect.Start,
      },
      {
        fieldName: 'statusSelect',
        operator: '=',
        value: Timer?.statusSelect.Pause,
      },
    ],
  });

  return criteria;
};

const createNumberTimerByDateCriteria = (userId, date) => {
  const criteria = createTimerCriteria(null, userId);

  const dateStartOfDay = getStartOfDay(date);
  const dateEndOfDay = getEndOfDay(date);
  criteria.push({
    operator: 'and',
    criteria: [
      {
        fieldName: 'startDateTime',
        operator: '>=',
        value: dateStartOfDay,
      },
      {
        fieldName: 'startDateTime',
        operator: '<=',
        value: dateEndOfDay,
      },
    ],
  });

  return criteria;
};

export async function fetchTimer({
  searchValue = null,
  userId,
  fromDate,
  toDate,
  page = 0,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.TSTimer',
    criteria: createTimerCriteria(searchValue, userId, fromDate, toDate),
    fieldKey: 'hr_timer',
    sortKey: 'hr_timer',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function fetchTimerById({timerId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.hr.db.TSTimer',
    id: timerId,
    fieldKey: 'hr_timer',
    provider: 'model',
  });
}

export async function fetchActiveTimer({userId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.TSTimer',
    criteria: createActiveTimerCriteria(userId),
    fieldKey: 'hr_timer',
    sortKey: 'hr_activeTimer',
    numberElementsByPage: 1,
    page: 0,
    provider: 'model',
  });
}

export async function getNumberTimerByDate({userId, date}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.TSTimer',
    criteria: createNumberTimerByDateCriteria(userId, date),
    fieldKey: 'hr_timer',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function createTimer({timer}) {
  const formattedTimer =
    timer.startDateTime != null
      ? {...timer, startDateTime: getDateZonesISOString(timer.startDateTime)}
      : timer;

  return getActionApi().send({
    url: 'ws/aos/timesheet/timer/',
    method: 'post',
    body: formattedTimer,
    description: 'create timer',
  });
}

export async function updateTimer({timer}) {
  const formattedTimer =
    timer.startDateTime != null
      ? {...timer, startDateTime: getDateZonesISOString(timer.startDateTime)}
      : timer;

  return getActionApi().send({
    url: `ws/aos/timesheet/timer/update/${timer.id}`,
    method: 'put',
    body: formattedTimer,
    description: 'update timer',
  });
}

export async function updateTimerStatus({timerId, version, toStatus}) {
  return getActionApi().send({
    url: `ws/aos/timesheet/timer/status/${timerId}`,
    method: 'put',
    body: {
      version,
      toStatus,
    },
    description: 'update timer status',
    matchers: {
      modelName: 'com.axelor.apps.hr.db.TSTimer',
      id: timerId,
      fields: {
        toStatus: 'statusSelect',
      },
    },
  });
}

export async function deleteTimer({timerId}) {
  return getActionApi().send({
    url: `ws/rest/com.axelor.apps.hr.db.TSTimer/${timerId}`,
    method: 'delete',
    description: 'delete timer',
    matchers: {
      modelName: 'com.axelor.apps.hr.db.TSTimer',
      id: timerId,
    },
  });
}
