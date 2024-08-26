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
  createStandardSearch,
  getTypes,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createLeaveCriteria = (userId, selectedStatus) => {
  const criteria = [
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

const createLeaveToValidateCriteria = (searchValue, user) => {
  const LeaveRequest = getTypes().LeaveRequest;

  const criteria = [
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

export async function fetchLeave({userId, selectedStatus, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.LeaveRequest',
    criteria: createLeaveCriteria(userId, selectedStatus),
    fieldKey: 'hr_leave',
    sortKey: 'hr_leave',
    page,
  });
}

export async function fetchLeaveToValidate({searchValue, user, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.LeaveRequest',
    criteria: createLeaveToValidateCriteria(searchValue, user),
    fieldKey: 'hr_leave',
    sortKey: 'hr_leave',
    page,
  });
}
