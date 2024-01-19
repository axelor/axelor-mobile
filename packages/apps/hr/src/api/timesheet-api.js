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
  getSearchCriterias,
} from '@axelor/aos-mobile-core';
import {Timesheet} from '../types';

const createTimesheetCriteria = (searchValue, userId) => {
  return [
    {
      fieldName: 'employee.user.id',
      operator: '=',
      value: userId,
    },
    getSearchCriterias('hr_timesheet', searchValue),
  ];
};

const createTimesheetToValidateCriteria = (searchValue, user) => {
  const criteria = [
    getSearchCriterias('hr_timesheet', searchValue),
    {
      fieldName: 'statusSelect',
      operator: '=',
      value: Timesheet.statusSelect.WaitingValidation,
    },
  ];

  if (!user?.employee?.hrManager) {
    criteria.push({
      fieldName: 'employee.managerUser.id',
      operator: '=',
      value: user?.id,
    });
  }

  return criteria;
};

const createDraftTimesheetCriteria = (
  userId,
  fromDate,
  toDate,
  isOverlapAllowed,
) => {
  const criteria = [
    {
      fieldName: 'statusSelect',
      operator: '=',
      value: Timesheet.statusSelect.Draft,
    },
  ];

  if (userId != null) {
    criteria.push({
      fieldName: 'employee.user.id',
      operator: '=',
      value: userId,
    });
  }

  if (fromDate != null && toDate != null) {
    if (isOverlapAllowed) {
      criteria.push({
        operator: 'and',
        criteria: [
          {
            fieldName: 'fromDate',
            operator: '>=',
            value: fromDate,
          },
          {
            fieldName: 'toDate',
            operator: '<=',
            value: toDate,
          },
        ],
      });
    } else {
      criteria.push({
        operator: 'or',
        criteria: [
          {
            operator: 'and',
            criteria: [
              {
                fieldName: 'fromDate',
                operator: '<=',
                value: fromDate,
              },
              {
                fieldName: 'toDate',
                operator: '>=',
                value: fromDate,
              },
            ],
          },
          {
            operator: 'and',
            criteria: [
              {
                fieldName: 'fromDate',
                operator: '<=',
                value: toDate,
              },
              {
                fieldName: 'toDate',
                operator: '>=',
                value: toDate,
              },
            ],
          },
        ],
      });
    }
  }

  return criteria;
};

export async function fetchTimesheet({searchValue = null, userId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Timesheet',
    criteria: createTimesheetCriteria(searchValue, userId),
    fieldKey: 'hr_timesheet',
    sortKey: 'hr_timesheet',
    page,
  });
}

export async function fetchTimesheetToValidate({
  searchValue = null,
  page = 0,
  user,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Timesheet',
    criteria: createTimesheetToValidateCriteria(searchValue, user),
    fieldKey: 'hr_timesheet',
    sortKey: 'hr_timesheet',
    page,
  });
}

export async function fetchTimesheetById({timesheetId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.hr.db.Timesheet',
    id: timesheetId,
    fieldKey: 'hr_timesheet',
  });
}

export async function fetchDraftTimesheet({
  userId,
  fromDate,
  toDate,
  isOverlapAllowed,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Timesheet',
    criteria: createDraftTimesheetCriteria(
      userId,
      fromDate,
      toDate,
      isOverlapAllowed,
    ),
    fieldKey: 'hr_timesheet',
    numberElementsByPage: null,
    page: 0,
  });
}
