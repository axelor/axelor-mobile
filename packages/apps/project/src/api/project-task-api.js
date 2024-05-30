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
  combinedStatusFilter,
  combinedPriorityFilter,
}) => {
  const criteria = [
    getSearchCriterias('project_projectTask', searchValue),
    {
      fieldName: 'id',
      operator: 'in',
      value: idsProjectTask,
    },
  ];

  if (userId != null) {
    criteria.push({
      fieldName: 'assignedTo.id',
      operator: '=',
      value: userId,
    });
  }

  if (Array.isArray(combinedStatusFilter) && combinedStatusFilter.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: combinedStatusFilter.map(status => ({
        fieldName: 'status.id',
        operator: '=',
        value: status,
      })),
    });
  }

  if (
    Array.isArray(combinedPriorityFilter) &&
    combinedPriorityFilter.length > 0
  ) {
    criteria.push({
      operator: 'or',
      criteria: combinedPriorityFilter.map(priority => ({
        fieldName: 'priority.id',
        operator: '=',
        value: priority,
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
  statusToFilter,
  priorityToFilter,
}) {
  if (!Array.isArray(idsProjectTask) || idsProjectTask.length === 0) {
    return {data: {data: [], total: 0}};
  }

  const combinedStatusFilter = [
    ...new Set([
      ...statusToFilter,
      ...selectedStatus.map(status => status.key),
    ]),
  ];

  const combinedPriorityFilter = [
    ...new Set([
      ...priorityToFilter,
      ...selectedPriority.map(priority => priority.key),
    ]),
  ];

  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTask',
    criteria: createProjectTaskCriteria({
      searchValue,
      idsProjectTask,
      userId,
      combinedStatusFilter,
      combinedPriorityFilter,
    }),
    fieldKey: 'project_projectTask',
    sortKey: 'project_projectTask',
    page,
  });
}

export async function fetchProjectTaskStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.TaskStatus',
    fieldKey: 'project_projectStatus',
    numberElementsByPage: null,
    page: 0,
  });
}

export async function fetchProjectPriority() {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectPriority',
    fieldKey: 'project_projectPriority',
    numberElementsByPage: null,
    page: 0,
  });
}
