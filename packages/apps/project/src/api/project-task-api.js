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

export async function searchProjectTask({
  searchValue,
  page = 0,
  projectId,
  userId,
  selectedStatus,
  selectedPriority,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTask',
    criteria: createProjectTaskCriteria({
      searchValue,
      projectId,
      userId,
      selectedStatus,
      selectedPriority,
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

export async function searchCategory({searchValue, page = 0, projectId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTaskCategory',
    criteria: [getSearchCriterias('project_projectTaskCategory', searchValue)],
    fieldKey: 'project_projectTaskCategory',
    sortKey: 'project_projectTaskCategory',
    page,
    _domain: 'self.id IN (1)',
    domainContext: {project: {id: projectId}},
  });
}

export async function searchSection({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTaskSection',
    criteria: [getSearchCriterias('project_TaskSection', searchValue)],
    fieldKey: 'project_TaskSection',
    sortKey: 'project_TaskSection',
    page,
  });
}

export async function searchPriority({searchValue, page = 0, projectId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectPriority',
    criteria: [getSearchCriterias('project_projectPriority', searchValue)],
    fieldKey: 'project_projectPriority',
    sortKey: 'project_projectPriority',
    page,
    _domain: 'self.id IN (1)',
    domainContext: {project: {id: projectId}},
  });
}

export async function updateProjectTask({project}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.project.db.ProjectTask/',
    data: {
      data: project,
    },
  });
}
