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
  createStandardFetch,
  createStandardSearch,
  Criteria,
  formatRequestBody,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createTeamTaskCriterias = ({
  searchValue,
  selectedStatus,
  selectedPriority,
}: {
  searchValue?: string;
  selectedStatus?: any[];
  selectedPriority?: any[];
}) => {
  const criteria: Criteria[] = [
    getSearchCriterias('team_teamTask', searchValue!),
  ];

  if (Array.isArray(selectedStatus) && selectedStatus.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: selectedStatus.map(({key}) => ({
        fieldName: 'status',
        operator: '=',
        value: key,
      })),
    });
  }

  if (Array.isArray(selectedPriority) && selectedPriority.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: selectedPriority.map(({key}) => ({
        fieldName: 'priority',
        operator: '=',
        value: key,
      })),
    });
  }

  return criteria;
};

export async function searchTeamTasks({
  searchValue,
  selectedStatus,
  selectedPriority,
  page = 0,
  filterDomain,
}: {
  searchValue?: string;
  selectedStatus?: any[];
  selectedPriority?: any[];
  page?: number;
  filterDomain?: any;
}) {
  return createStandardSearch({
    model: 'com.axelor.team.db.TeamTask',
    criteria: createTeamTaskCriterias({
      searchValue,
      selectedStatus,
      selectedPriority,
    }),
    fieldKey: 'team_teamTask',
    sortKey: 'team_teamTask',
    page,
    filter: filterDomain,
    provider: 'model',
  });
}

export async function fetchTeamTask({id}: {id: number}) {
  if (id == null) return null;

  return createStandardFetch({
    model: 'com.axelor.team.db.TeamTask',
    id,
    fieldKey: 'team_teamTask',
    provider: 'model',
  });
}

export async function saveTeamTask(body: any) {
  const {matchers, formattedData} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.team.db.TeamTask',
    method: 'post',
    body: {data: formattedData},
    description: 'save team task',
    matchers: {
      modelName: 'com.axelor.team.db.TeamTask',
      id: body?.id ?? Date.now(),
      fields: matchers,
    },
  });
}
