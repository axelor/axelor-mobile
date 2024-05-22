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

const createProjectCriteria = ({
  searchValue,
  isBusinessProject,
  statusList,
  userId,
}) => {
  const criteria = [getSearchCriterias('project_project', searchValue)];

  if (isBusinessProject) {
    criteria.push({
      fieldName: 'isBusinessProject',
      operator: '=',
      value: true,
    });
  } else {
    criteria.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'isBusinessProject',
          operator: '=',
          value: false,
        },
        {
          fieldName: 'isBusinessProject',
          operator: 'isNull',
        },
      ],
    });
  }

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

export async function searchProject({
  searchValue,
  page = 0,
  isBusinessProject = false,
  statusList,
  userId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.Project',
    criteria: createProjectCriteria({
      searchValue,
      isBusinessProject,
      statusList,
      userId,
    }),
    fieldKey: 'project_project',
    sortKey: 'project_project',
    page,
  });
}

export async function fetchProjectStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectStatus',
    fieldKey: 'project_projectStatus',
    numberElementsByPage: null,
    page: 0,
  });
}
