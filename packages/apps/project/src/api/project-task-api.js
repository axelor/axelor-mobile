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
  projectId,
  userId,
  statusFilter,
  priorityFilter,
}) => {
  const criteria = [getSearchCriterias('project_projectTask', searchValue)];

  if (projectId != null) {
    criteria.push({
      fieldName: 'project.id',
      operator: '=',
      value: projectId,
    });
  }

  if (userId != null) {
    criteria.push({
      fieldName: 'assignedTo.id',
      operator: '=',
      value: userId,
    });
  }

  if (Array.isArray(statusFilter) && statusFilter.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: statusFilter.map(status => ({
        fieldName: 'status.id',
        operator: '=',
        value: status,
      })),
    });
  }

  if (Array.isArray(priorityFilter) && priorityFilter.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: priorityFilter.map(priority => ({
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
  projectId,
  userId,
  selectedStatus,
  selectedPriority,
  statusToFilter,
  priorityToFilter,
}) {
  const statusFilter =
    selectedStatus.length > 0
      ? selectedStatus.map(status => status.key)
      : statusToFilter;

  const priorityFilter =
    selectedPriority.length > 0
      ? selectedPriority.map(priority => priority.key)
      : priorityToFilter;

  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTask',
    criteria: createProjectTaskCriteria({
      searchValue,
      projectId,
      userId,
      statusFilter,
      priorityFilter,
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
