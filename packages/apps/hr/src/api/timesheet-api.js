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
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
  getActionApi,
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';

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
  const Timesheet = getTypes().Timesheet;

  const criteria = [
    getSearchCriterias('hr_timesheet', searchValue),
    {
      fieldName: 'statusSelect',
      operator: '=',
      value: Timesheet?.statusSelect.WaitingValidation,
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
  const Timesheet = getTypes().Timesheet;

  const criteria = [
    {
      fieldName: 'statusSelect',
      operator: '=',
      value: Timesheet?.statusSelect.Draft,
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

export async function fetchTimesheet({
  searchValue = null,
  userId,
  page = 0,
  companyId,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Timesheet',
    criteria: createTimesheetCriteria(searchValue, userId),
    fieldKey: 'hr_timesheet',
    sortKey: 'hr_timesheet',
    page,
    provider: 'model',
    companyId,
    filter: filterDomain,
  });
}

export async function fetchTimesheetToValidate({
  searchValue = null,
  page = 0,
  user,
  companyId,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Timesheet',
    criteria: createTimesheetToValidateCriteria(searchValue, user),
    fieldKey: 'hr_timesheet',
    sortKey: 'hr_timesheet',
    page,
    provider: 'model',
    companyId,
    filter: filterDomain,
  });
}

export async function fetchTimesheetById({timesheetId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.hr.db.Timesheet',
    id: timesheetId,
    fieldKey: 'hr_timesheet',
    provider: 'model',
  });
}

export async function fetchDraftTimesheet({
  userId,
  fromDate,
  toDate,
  isOverlapAllowed,
  companyId,
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
    provider: 'model',
    companyId,
  });
}

export async function createTimesheet({fromDate, toDate, timerIdList}) {
  return getActionApi().send({
    url: 'ws/aos/timesheet',
    method: 'post',
    body: {
      fromDate,
      toDate,
      timerIdList,
    },
    description: 'create timesheet',
  });
}

export async function addTimerTimesheet({timesheetId, version, timerIdList}) {
  return getActionApi().send({
    url: `ws/aos/timesheet/add-timer/${timesheetId}`,
    method: 'put',
    body: {
      version,
      timerIdList,
    },
    description: 'add timer to timesheet',
  });
}

export async function updateTimesheetStatus({
  timesheetId,
  version,
  toStatus,
  groundForRefusal,
}) {
  return getActionApi().send({
    url: `ws/aos/timesheet/status/${timesheetId}`,
    method: 'put',
    body: {
      version,
      toStatus,
      groundForRefusal,
    },
    description: 'update timesheet status',
    matchers: {
      modelName: 'com.axelor.apps.hr.db.Timesheet',
      id: timesheetId,
      fields: {
        toStatus: 'statusSelect',
        groundForRefusal,
      },
    },
  });
}

export async function deleteTimesheet({timesheetId}) {
  return getActionApi().send({
    url: `ws/rest/com.axelor.apps.hr.db.Timesheet/${timesheetId}`,
    method: 'delete',
    description: 'delete timesheet',
    matchers: {
      modelName: 'com.axelor.apps.hr.db.Timesheet',
      id: timesheetId,
    },
  });
}

export async function convertPeriodTimesheet({timesheetId}) {
  return axiosApiProvider.get({
    url: `ws/aos/timesheet/convertPeriod/${timesheetId}`,
  });
}
