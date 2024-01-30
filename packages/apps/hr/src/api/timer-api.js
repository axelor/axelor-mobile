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
  createStandardFetch,
  createStandardSearch,
  getEndOfDay,
  getSearchCriterias,
  getStartOfDay,
} from '@axelor/aos-mobile-core';
import {Time} from '../types';

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
  const criteria = createTimerCriteria(null, userId);

  criteria.push({
    operator: 'OR',
    criteria: [
      {
        fieldName: 'statusSelect',
        operator: '=',
        value: Time.statusSelect.InProgress,
      },
      {
        fieldName: 'statusSelect',
        operator: '=',
        value: Time.statusSelect.Paused,
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
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.TSTimer',
    criteria: createTimerCriteria(searchValue, userId, fromDate, toDate),
    fieldKey: 'hr_timer',
    sortKey: 'hr_timer',
    page,
  });
}

export async function fetchTimerById({timerId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.hr.db.TSTimer',
    id: timerId,
    fieldKey: 'hr_timer',
  });
}

export async function fetchActiveTimer({userId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.TSTimer',
    criteria: createActiveTimerCriteria(userId),
    fieldKey: 'hr_timer',
    sortKey: 'hr_timer',
    numberElementsByPage: 1,
    page: 0,
  });
}
