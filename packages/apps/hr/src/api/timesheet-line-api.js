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
  createStandardSearch,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createTimesheetLineCriteria = (searchValue, timesheetId) => {
  return [
    {
      fieldName: 'timesheet.id',
      operator: '=',
      value: timesheetId,
    },
    getSearchCriterias('hr_timesheetLine', searchValue),
  ];
};

export async function fetchTimesheetLine({
  searchValue = null,
  timesheetId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.TimesheetLine',
    criteria: createTimesheetLineCriteria(searchValue, timesheetId),
    fieldKey: 'hr_timesheetLine',
    sortKey: 'hr_timesheetLine',
    page,
    provider: 'model',
  });
}

export async function createTimesheetLine({timesheetLine}) {
  return getActionApi()
    .send({
      url: 'ws/aos/business/timesheet-line',
      method: 'post',
      body: timesheetLine,
      description: 'create timesheet line in business',
    })
    .catch(e => {
      if (e.response.status === 404) {
        return getActionApi().send({
          url: 'ws/aos/timesheet-line',
          method: 'post',
          body: timesheetLine,
          description: 'create timesheet line',
        });
      } else {
        throw e;
      }
    });
}

export async function updateTimesheetLine({timesheetLineId, timesheetLine}) {
  return getActionApi()
    .send({
      url: `ws/aos/business/timesheet-line/update/${timesheetLineId}`,
      method: 'put',
      body: timesheetLine,
      description: 'update timesheet line in business',
    })
    .catch(e => {
      if (e.response.status === 404) {
        return getActionApi().send({
          url: `ws/aos/timesheet-line/update/${timesheetLineId}`,
          method: 'put',
          body: timesheetLine,
          description: 'update timesheet line',
        });
      } else {
        throw e;
      }
    });
}

export async function deleteTimesheetLine({timesheetLineId}) {
  return getActionApi().send({
    url: `ws/rest/com.axelor.apps.hr.db.TimesheetLine/${timesheetLineId}`,
    method: 'delete',
    description: 'delete timesheet line',
    matchers: {
      modelName: 'com.axelor.apps.hr.db.TimesheetLine',
      id: timesheetLineId,
    },
  });
}
