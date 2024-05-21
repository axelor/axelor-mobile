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
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createProjectTaskCriteria = ({
  searchValue,
  idsProjectTask,
  userId,
  selectedStatus,
  selectedPriority,
}) => {
  const criteria = [getSearchCriterias('project_projectTask', searchValue)];

  criteria.push({
    fieldName: 'id',
    operator: 'in',
    value: idsProjectTask,
  });

  if (userId != null) {
    criteria.push({
      fieldName: 'assignedTo.employee.user.id',
      operator: '=',
      value: userId,
    });
  }

  if (Array.isArray(selectedStatus) && selectedStatus.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: selectedStatus.map(status => ({
        fieldName: 'status.id',
        operator: '=',
        value: status.key,
      })),
    });
  }

  if (Array.isArray(selectedPriority) && selectedPriority.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: selectedPriority.map(priority => ({
        fieldName: 'priority.id',
        operator: '=',
        value: priority.key,
      })),
    });
  }

  return criteria;
};

export async function searchProjectTask({
  searchValue,
  page = 0,
  idsProjectTask,
  userId,
  selectedStatus,
  selectedPriority,
}) {
  if (!Array.isArray(idsProjectTask) || idsProjectTask.length === 0) {
    return {data: {data: [], total: 0}};
  }

  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTask',
    criteria: createProjectTaskCriteria({
      searchValue,
      idsProjectTask,
      userId,
      selectedStatus,
      selectedPriority,
    }),
    fieldKey: 'project_projectTask',
    sortKey: 'project_projectTask',
    page,
  });
}
