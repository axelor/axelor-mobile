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
  Criteria,
  formatRequestBody,
  getActionApi,
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';
import {toDateString} from '@axelor/aos-mobile-ui';

type ApiDate = Date | string;

const toApiDate = (date: ApiDate): string =>
  typeof date === 'string' ? date : toDateString(date);

const createLeaveCriteria = (
  userId: number,
  selectedStatus?: number,
): Criteria[] => {
  const criteria: Criteria[] = [
    {
      fieldName: 'employee.user.id',
      operator: '=',
      value: userId,
    },
    {
      fieldName: 'toJustifyLeaveReason',
      operator: '=',
      value: false,
    },
  ];

  if (selectedStatus != null) {
    criteria.push({
      fieldName: 'statusSelect',
      operator: '=',
      value: selectedStatus,
    });
  }

  return criteria;
};

const createLeaveToValidateCriteria = (
  searchValue: string | undefined,
  user: any,
): Criteria[] => {
  const LeaveRequest = getTypes().LeaveRequest;

  const criteria: Criteria[] = [
    getSearchCriterias('hr_leave', searchValue),
    {
      fieldName: 'statusSelect',
      operator: '=',
      value: LeaveRequest?.statusSelect.WaitingValidation,
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

export async function fetchLeave({
  userId,
  selectedStatus,
  page = 0,
  companyId,
  filterDomain,
}: {
  userId: number;
  selectedStatus?: number;
  page?: number;
  companyId?: number;
  filterDomain?: any;
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.LeaveRequest',
    criteria: createLeaveCriteria(userId, selectedStatus),
    fieldKey: 'hr_leave',
    sortKey: 'hr_leave',
    page,
    companyId,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function fetchLeaveToValidate({
  searchValue,
  user,
  page = 0,
  companyId,
  filterDomain,
}: {
  searchValue?: string;
  user: any;
  page?: number;
  companyId?: number;
  filterDomain?: any;
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.LeaveRequest',
    criteria: createLeaveToValidateCriteria(searchValue, user),
    fieldKey: 'hr_leave',
    sortKey: 'hr_leave',
    page,
    companyId,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function fetchLeaveById({leaveId}: {leaveId: number}) {
  return createStandardFetch({
    model: 'com.axelor.apps.hr.db.LeaveRequest',
    id: leaveId,
    fieldKey: 'hr_leave',
    provider: 'model',
  });
}

export async function fetchLeaveReason({
  searchValue,
  employeeId,
  page = 0,
}: {
  searchValue?: string;
  employeeId: number;
  page?: number;
}) {
  const LeaveReason = getTypes().LeaveReason;

  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.LeaveReason',
    criteria: [getSearchCriterias('hr_leaveReason', searchValue)],
    domain:
      'self.leaveReasonTypeSelect = :exceptionalLeave OR self IN (SELECT leaveReason FROM LeaveLine leaveLine WHERE leaveLine.employee.id = :employeeId)',
    domainContext: {
      employeeId: employeeId,
      exceptionalLeave: LeaveReason?.leaveReasonTypeSelect.ExceptionalLeave,
    },
    fieldKey: 'hr_leaveReason',
    page,
    provider: 'model',
  });
}

export async function fetchMissingDuration({
  fromDate,
  toDate,
  startOnSelect,
  endOnSelect,
}: {
  fromDate: ApiDate;
  toDate: ApiDate;
  startOnSelect: number;
  endOnSelect: number;
}): Promise<number> {
  return getActionApi()
    .send({
      url: 'ws/aos/leave-request/compute-duration',
      method: 'post',
      body: {
        fromDate: toApiDate(fromDate),
        toDate: toApiDate(toDate),
        startOnSelect,
        endOnSelect,
      },
      description: 'compute duration',
    })
    .then(res => Number(res?.data?.object?.duration));
}

export async function sendLeave({
  leaveRequestId,
  version,
}: {
  leaveRequestId: number;
  version: number;
}) {
  return getActionApi().send({
    url: `ws/aos/leave-request/send/${leaveRequestId}`,
    method: 'put',
    body: {
      version,
    },
    description: 'send leave',
  });
}

export async function validateLeave({
  leaveRequestId,
  version,
}: {
  leaveRequestId: number;
  version: number;
}) {
  return getActionApi().send({
    url: `ws/aos/leave-request/validate/${leaveRequestId}`,
    method: 'put',
    body: {
      version,
    },
    description: 'validate leave',
  });
}

export async function cancelLeave({
  leaveRequestId,
  version,
}: {
  leaveRequestId: number;
  version: number;
}) {
  return getActionApi().send({
    url: `ws/aos/leave-request/cancel/${leaveRequestId}`,
    method: 'put',
    body: {
      version,
    },
    description: 'cancel leave',
  });
}

export async function rejectLeave({
  leaveRequestId,
  version,
  groundForRefusal,
}: {
  leaveRequestId: number;
  version: number;
  groundForRefusal?: string;
}) {
  return getActionApi().send({
    url: `ws/aos/leave-request/reject/${leaveRequestId}`,
    method: 'put',
    body: {
      version,
      groundForRefusal,
    },
    description: 'reject leave',
  });
}

export async function deleteLeave({leaveRequestId}: {leaveRequestId: number}) {
  return getActionApi().send({
    url: `ws/rest/com.axelor.apps.hr.db.LeaveRequest/${leaveRequestId}`,
    method: 'delete',
    body: {},
    description: 'delete leave request',
    matchers: {
      modelName: 'com.axelor.apps.hr.db.LeaveRequest',
      id: leaveRequestId,
      fields: {},
    },
  });
}

export async function updateLeave({leave}: {leave: any}) {
  const {matchers, formattedData} = formatRequestBody(leave, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.hr.db.LeaveRequest',
    method: 'post',
    body: {
      data: formattedData,
    },
    description: 'update leave',
    matchers: {
      modelName: 'com.axelor.apps.hr.db.LeaveRequest',
      id: leave.id,
      fields: matchers,
    },
  });
}

export async function createLeaveRequest({
  fromDate,
  startOnSelect,
  lines,
}: {
  fromDate: ApiDate;
  startOnSelect: number;
  lines: {
    id: number;
    qty: number;
    comment?: string;
  }[];
}) {
  const requests = lines.map(line => ({
    leaveReasonId: line.id,
    duration: line.qty,
    comment: line.comment,
  }));

  return getActionApi().send({
    url: 'ws/aos/leave-request/',
    method: 'post',
    body: {
      fromDate: toApiDate(fromDate),
      startOnSelect,
      requests,
    },
    description: 'create leave request',
  });
}

export async function fetchLeaveReasonAvailability({
  toDate,
  leaveReasonId,
}: {
  toDate: ApiDate;
  leaveReasonId: number;
}): Promise<number> {
  return getActionApi()
    .send({
      url: 'ws/aos/leave-request/compute-leave-available',
      method: 'post',
      body: {
        toDate: toApiDate(toDate),
        leaveReasonId,
      },
      description: 'fetch leave reason availability',
      ignoreRequest: true,
    })
    .then(res => Number(res?.data?.object?.leaveDays));
}
