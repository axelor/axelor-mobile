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
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createProjectTaskCriteria = ({
  searchValue,
  projectId,
  userId,
  selectedStatus,
  selectedPriority,
  projectTaskId,
}) => {
  const criteria = [getSearchCriterias('project_projectTask', searchValue)];

  if (projectId != null) {
    criteria.push({
      fieldName: 'project.id',
      operator: '=',
      value: projectId,
    });
  }

  if (projectTaskId != null) {
    criteria.push({
      fieldName: 'id',
      operator: '!=',
      value: projectTaskId,
    });
  }

  if (userId != null) {
    criteria.push({
      fieldName: 'assignedTo.id',
      operator: '=',
      value: userId,
    });
  }

  if (Array.isArray(selectedStatus) && selectedStatus.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: selectedStatus.map(({key}) => ({
        fieldName: 'status.id',
        operator: '=',
        value: key,
      })),
    });
  }

  if (Array.isArray(selectedPriority) && selectedPriority.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: selectedPriority.map(({key}) => ({
        fieldName: 'priority.id',
        operator: '=',
        value: key,
      })),
    });
  }

  return criteria;
};

const createPriorityCriteria = ({searchValue, priorityIds}) => {
  return [
    getSearchCriterias('project_projectPriority', searchValue),
    {
      fieldName: 'id',
      operator: 'in',
      value: priorityIds,
    },
  ];
};

const createStatusCriteria = ({searchValue, statusIds}) => {
  return [
    getSearchCriterias('project_taskStatus', searchValue),
    {
      fieldName: 'id',
      operator: 'in',
      value: statusIds,
    },
  ];
};

const createCategoryCriteria = ({searchValue, categoryIds}) => {
  return [
    getSearchCriterias('project_projectTaskCategory', searchValue),
    {
      fieldName: 'id',
      operator: 'in',
      value: categoryIds,
    },
  ];
};

export async function searchProjectTask({
  searchValue,
  page = 0,
  projectId,
  userId,
  selectedStatus,
  selectedPriority,
  projectTaskId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTask',
    criteria: createProjectTaskCriteria({
      searchValue,
      projectId,
      userId,
      selectedStatus,
      selectedPriority,
      projectTaskId,
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

export async function fetchProjectTaskById({projecTaskId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.project.db.ProjectTask',
    id: projecTaskId,
    fieldKey: 'project_projectTask',
    relatedFields: {
      projectTaskTagSet: ['name', 'colorSelect'],
    },
  });
}

export async function getProjectTaskTag() {
  return axiosApiProvider.get({
    url: 'ws/rest/com.axelor.apps.project.db.ProjectTaskTag/',
  });
}

export async function searchTargetVersion({searchValue, page = 0, projectId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.businesssupport.db.ProjectVersion',
    criteria: [getSearchCriterias('project_projectVersion', searchValue)],
    fieldKey: 'project_projectVersion',
    sortKey: 'project_projectVersion',
    page,
    domain: ':project member of self.projectSet',
    domainContext: {project: {id: projectId}},
  });
}

export async function searchCategory({searchValue, page = 0, categoryIds}) {
  if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
    return {data: {data: [], total: 0}};
  }

  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTaskCategory',
    criteria: createCategoryCriteria({searchValue, categoryIds}),
    fieldKey: 'project_projectTaskCategory',
    sortKey: 'project_projectTaskCategory',
    page,
  });
}

export async function searchSection({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTaskSection',
    criteria: [getSearchCriterias('project_projectTaskSection', searchValue)],
    fieldKey: 'project_projectTaskSection',
    sortKey: 'project_projectTaskSection',
    page,
  });
}

export async function searchPriority({searchValue, page = 0, priorityIds}) {
  if (!Array.isArray(priorityIds) || priorityIds.length === 0) {
    return {data: {data: [], total: 0}};
  }

  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectPriority',
    criteria: createPriorityCriteria({searchValue, priorityIds}),
    fieldKey: 'project_projectPriority',
    sortKey: 'project_projectPriority',
    page,
  });
}

export async function searchStatus({searchValue, page = 0, statusIds}) {
  if (!Array.isArray(statusIds) || statusIds.length === 0) {
    return {data: {data: [], total: 0}};
  }

  return createStandardSearch({
    model: 'com.axelor.apps.project.db.TaskStatus',
    criteria: createStatusCriteria({searchValue, statusIds}),
    fieldKey: 'project_taskStatus',
    sortKey: 'project_taskStatus',
    page,
  });
}

export async function saveProjectTask({projectTask}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.project.db.ProjectTask/',
    data: {
      data: projectTask,
    },
  });
}
