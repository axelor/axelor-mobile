/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  formatRequestBody,
  getActionApi,
  getObjectFields,
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';

const createProjectTaskCriteria = ({
  searchValue,
  projectId,
  userId,
  selectedStatus,
  selectedPriority,
  selectedCategory,
  projectTaskId,
}) => {
  const ProjectTask = getTypes().ProjectTask;

  const criteria = [
    {
      fieldName: 'typeSelect',
      operator: '=',
      value: ProjectTask?.typeSelect.Task,
    },
    getSearchCriterias('project_projectTask', searchValue),
  ];

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

  if (Array.isArray(selectedCategory) && selectedCategory.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: selectedCategory.map(({key}) => ({
        fieldName: 'projectTaskCategory.id',
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

const createTaskLinkCriteria = ({searchValue, taskId}) => {
  return [
    getSearchCriterias('project_projectTaskLink', searchValue),
    {
      fieldName: 'projectTask.id',
      operator: '=',
      value: taskId,
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

const createSprintCriteria = ({
  searchValue,
  sprintManagedOnProject,
  projectId,
  targetVersionId,
  backlogSprintId,
}) => {
  return [
    getSearchCriterias('project_projectSprint', searchValue),
    {
      operator: 'or',
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: sprintManagedOnProject
                ? 'project.id'
                : 'targetVersion.id',
              operator: '=',
              value: sprintManagedOnProject ? projectId : targetVersionId,
            },
            {
              fieldName: 'toDate',
              operator: '>',
              value: new Date(),
            },
          ],
        },
        {
          fieldName: 'id',
          operator: '=',
          value: backlogSprintId,
        },
      ],
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
  selectedCategory,
  projectTaskId,
  companyId,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTask',
    companyId,
    companyFieldName: 'project.company',
    criteria: createProjectTaskCriteria({
      searchValue,
      projectId,
      userId,
      selectedStatus,
      selectedPriority,
      selectedCategory,
      projectTaskId,
    }),
    fieldKey: 'project_projectTask',
    sortKey: 'project_projectTask',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function fetchProjectTaskStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.TaskStatus',
    fieldKey: 'project_projectStatus',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function fetchProjectPriority() {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectPriority',
    fieldKey: 'project_projectPriority',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function fetchProjectTaskCategory() {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTaskCategory',
    fieldKey: 'project_projectTaskCategory',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function fetchProjectTaskById({projecTaskId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.project.db.ProjectTask',
    id: projecTaskId,
    fieldKey: 'project_projectTask',
    relatedFields: {
      tagSet: ['name', 'colorSelect'],
      project: getObjectFields('project_project'),
      'project.projectTaskCategorySet': getObjectFields(
        'project_projectTaskCategory',
      ),
      'project.projectTaskPrioritySet': getObjectFields(
        'project_projectPriority',
      ),
      'project.projectTaskStatusSet': getObjectFields('project_taskStatus'),
    },
    provider: 'model',
  });
}

export async function getTag({activeCompany}) {
  return createStandardSearch({
    model: 'com.axelor.meta.db.MetaModel',
    criteria: [
      {
        fieldName: 'name',
        operator: '=',
        value: 'ProjectTask',
      },
    ],
    page: 0,
    fieldKey: '',
    numberElementsByPage: 1,
    provider: 'model',
  }).then(res =>
    createStandardSearch({
      model: 'com.axelor.apps.base.db.Tag',
      criteria: [],
      fieldKey: 'project_Tag',
      sortKey: 'project_Tag',
      page: 0,
      numberElementsByPage: null,
      companyId: activeCompany?.id,
      isCompanyM2M: true,
      domain:
        '(self.concernedModelSet IS EMPTY OR :metaModel member of self.concernedModelSet)',
      domainContext: {
        metaModel: {id: res?.data?.data?.[0]?.id},
      },
      provider: 'model',
    }),
  );
}

export async function searchTargetVersion({searchValue, page = 0, projectId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectVersion',
    criteria: [getSearchCriterias('project_projectVersion', searchValue)],
    fieldKey: 'project_projectVersion',
    sortKey: 'project_projectVersion',
    page,
    domain: ':project member of self.projectSet',
    domainContext: {project: {id: projectId}},
    provider: 'model',
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
    provider: 'model',
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
    provider: 'model',
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
    provider: 'model',
  });
}

export async function saveProjectTask({projectTask}) {
  const {matchers} = formatRequestBody(projectTask, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.project.db.ProjectTask/',
    method: 'post',
    body: {
      data: projectTask,
    },
    description: 'save project task',
    matchers: {
      modelName: 'com.axelor.apps.project.db.ProjectTask',
      id: projectTask.id,
      fields: matchers,
    },
  });
}

export async function searchProjectTaskLink({searchValue, page = 0, taskId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTaskLink',
    criteria: createTaskLinkCriteria({searchValue, taskId}),
    fieldKey: 'project_projectTaskLink',
    sortKey: 'project_projectTaskLink',
    page,
    provider: 'model',
  });
}

export async function searchSprint({
  searchValue,
  sprintManagedOnProject,
  projectId,
  targetVersionId,
  backlogSprintId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.Sprint',
    criteria: createSprintCriteria({
      searchValue,
      sprintManagedOnProject,
      projectId,
      targetVersionId,
      backlogSprintId,
    }),
    fieldKey: 'project_projectSprint',
    sortKey: 'project_projectSprint',
    page,
    provider: 'model',
  });
}
