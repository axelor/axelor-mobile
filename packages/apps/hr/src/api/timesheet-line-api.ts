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
  createStandardSearch,
  Criteria,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

export interface TimesheetLineCount {
  duration?: number;
  hoursDuration?: number;
  weeklyPlanningDuration?: number;
  weeklyPlanningHoursDuration?: number;
  leaveDuration?: number;
  leaveHoursDuration?: number;
  leaveReason?: string;
}

export type TimesheetLineCountMap = Record<string, TimesheetLineCount>;

const createTimesheetLineCriteria = ({
  searchValue,
  timesheetId,
}: {
  searchValue?: string;
  timesheetId: number;
}): Criteria[] => {
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
  searchValue,
  timesheetId,
  page = 0,
}: {
  searchValue?: string;
  timesheetId: number;
  page?: number;
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.TimesheetLine',
    criteria: createTimesheetLineCriteria({searchValue, timesheetId}),
    fieldKey: 'hr_timesheetLine',
    sortKey: 'hr_timesheetLine',
    page,
    provider: 'model',
  });
}

export async function fetchAllTimesheetLines({
  timesheetId,
}: {
  timesheetId: number;
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.TimesheetLine',
    criteria: createTimesheetLineCriteria({timesheetId}),
    fieldKey: 'hr_timesheetLine',
    sortKey: 'hr_timesheetLine',
    page: 0,
    numberElementsByPage: null as any,
    provider: 'model',
  });
}

export async function fetchTimesheetLineCount({
  timesheetId,
}: {
  timesheetId: number;
}): Promise<{data: {object: TimesheetLineCountMap}}> {
  return axiosApiProvider
    .get({url: `ws/aos/timesheet-line/count/${timesheetId}`})
    .then(response => ({...response, data: {object: response?.data}}));
}

export async function createTimesheetLine({
  timesheetLine,
}: {
  timesheetLine: any;
}) {
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

export async function updateTimesheetLine({
  timesheetLineId,
  timesheetLine,
}: {
  timesheetLineId: number;
  timesheetLine: any;
}) {
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

export async function deleteTimesheetLine({
  timesheetLineId,
}: {
  timesheetLineId: number;
}) {
  return getActionApi().send({
    url: `ws/rest/com.axelor.apps.hr.db.TimesheetLine/${timesheetLineId}`,
    method: 'delete',
    body: {},
    description: 'delete timesheet line',
    matchers: {
      modelName: 'com.axelor.apps.hr.db.TimesheetLine',
      id: timesheetLineId,
      fields: {},
    },
  });
}
