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
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createProjectCriteria = ({searchValue, manageTimeSpent, inProgress}) => {
  const criteria = [getSearchCriterias('hr_project', searchValue)];

  if (manageTimeSpent) {
    criteria.push({
      fieldName: 'manageTimeSpent',
      operator: '=',
      value: true,
    });
  }

  if (inProgress) {
    criteria.push({
      fieldName: 'projectStatus.isCompleted',
      operator: '=',
      value: false,
    });
  }

  return criteria;
};

const createProjectTaskCriteria = (
  searchValue,
  userId,
  projectId,
  isAssignedToRequired,
) => {
  const criteria = [getSearchCriterias('hr_projectTask', searchValue)];

  if (isAssignedToRequired) {
    criteria.push({
      fieldName: 'assignedTo.employee.user.id',
      operator: '=',
      value: userId,
    });
  }

  if (projectId != null) {
    criteria.push({
      fieldName: 'project.id',
      operator: '=',
      value: projectId,
    });
  }

  return criteria;
};

const createProductCriteria = searchValue => {
  return [
    {
      fieldName: 'isActivity',
      operator: '=',
      value: true,
    },
    {
      fieldName: 'dtype',
      operator: '=',
      value: 'Product',
    },
    getSearchCriterias('hr_projectTask', searchValue),
  ];
};

export async function searchProject({
  searchValue,
  page = 0,
  activeCompanyId,
  manageTimeSpent,
  isMemberRequired,
  userId,
  inProgress,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.Project',
    companyId: activeCompanyId,
    criteria: createProjectCriteria({
      searchValue,
      manageTimeSpent,
      inProgress,
    }),
    ...(isMemberRequired && {
      domain: ':user MEMBER OF self.membersUserSet OR self.assignedTo = :user',
      domainContext: {user: {id: userId}},
    }),
    fieldKey: 'hr_project',
    sortKey: 'hr_project',
    page,
    provider: 'model',
  });
}

export async function searchProjectTask({
  searchValue,
  page = 0,
  userId,
  projectId,
  isAssignedToRequired,
  isMemberRequired,
  companyId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTask',
    companyId,
    companyFieldName: 'project.company',
    criteria: createProjectTaskCriteria(
      searchValue,
      userId,
      projectId,
      isAssignedToRequired,
    ),
    ...(isMemberRequired && {
      domain: ':user MEMBER OF self.project.membersUserSet',
      domainContext: {
        user: {
          id: userId,
        },
      },
    }),
    fieldKey: 'hr_projectTask',
    sortKey: 'hr_projectTask',
    page,
    provider: 'model',
  });
}

export async function searchProduct({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Product',
    criteria: createProductCriteria(searchValue),
    fieldKey: 'hr_product',
    sortKey: 'hr_product',
    page,
    provider: 'model',
  });
}
