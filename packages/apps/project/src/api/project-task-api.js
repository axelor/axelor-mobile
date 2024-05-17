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

const createProjectTaskCriteria = ({searchValue, idsProjectTask}) => {
  const criteria = [getSearchCriterias('project_projectTask', searchValue)];

  criteria.push({
    fieldName: 'id',
    operator: 'in',
    value: idsProjectTask,
  });

  return criteria;
};

export async function searchProjectTask({
  searchValue,
  page = 0,
  idsProjectTask,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectTask',
    criteria: createProjectTaskCriteria({
      searchValue,
      idsProjectTask,
    }),
    fieldKey: 'project_projectTask',
    sortKey: 'project_projectTask',
    page,
  });
}
