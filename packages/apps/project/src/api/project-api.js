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
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createProjectCriteria = ({searchValue, statusList, userId}) => {
  const criteria = [getSearchCriterias('project_project', searchValue)];

  if (userId != null) {
    criteria.push({
      fieldName: 'assignedTo.id',
      operator: '=',
      value: userId,
    });
  }

  if (Array.isArray(statusList) && statusList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: statusList.map(({key}) => ({
        fieldName: 'projectStatus.id',
        operator: '=',
        value: key,
      })),
    });
  }

  return criteria;
};

const createSubProjectCriteria = ({projectId}) => {
  return [
    {
      fieldName: 'parentProject.id',
      operator: '=',
      value: projectId,
    },
  ];
};

export async function searchProject({
  searchValue,
  page = 0,
  statusList,
  userId,
  additionnalCriterias,
  companyId,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.Project',
    criteria: [
      ...createProjectCriteria({
        searchValue,
        statusList,
        userId,
      }),
      ...(additionnalCriterias ?? []),
    ],
    fieldKey: 'project_project',
    sortKey: 'project_project',
    page,
    provider: 'model',
    companyId,
    filter: filterDomain,
  });
}

export async function fetchProjectStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectStatus',
    fieldKey: 'project_projectStatus',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function fetchProjectById({projectId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.project.db.Project',
    id: projectId,
    fieldKey: 'project_project',
    provider: 'model',
  });
}

export async function searchSubProject({page = 0, projectId, companyId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.Project',
    criteria: createSubProjectCriteria({projectId}),
    fieldKey: 'project_project',
    sortKey: 'project_project',
    page,
    provider: 'model',
    companyId,
  });
}

export async function previousProjectActivity({projectId, startDate}) {
  return axiosApiProvider.post({
    url: 'ws/action/',
    data: {
      action: 'action-project-activity-dashboard-method-previous-on-click',
      data: {
        context: {
          id: projectId,
          startDate: startDate,
          _source: 'previousBtn',
          _signal: 'previousBtn',
        },
      },
      model: 'com.axelor.apps.project.db.Project',
      _signal: 'previousBtn',
      _source: 'previousBtn',
    },
  });
}
