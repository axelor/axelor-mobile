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
import {TeamTaskScope} from '../types';

const MODEL = 'com.axelor.team.db.TeamTask';

const createTeamTaskCriterias = ({
  searchValue,
  selectedStatus,
  selectedPriority,
  selectedScope,
  userId,
}: {
  searchValue?: string;
  selectedStatus?: any[];
  selectedPriority?: any[];
  selectedScope?: string;
  userId?: number;
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

  if (userId != null) {
    if (selectedScope === TeamTaskScope.scope.AssignedToMe) {
      criteria.push({
        fieldName: 'assignedTo.id',
        operator: '=',
        value: userId,
      });
    }

    if (selectedScope === TeamTaskScope.scope.Delegated) {
      criteria.push({
        operator: 'and',
        criteria: [
          {fieldName: 'createdBy.id', operator: '=', value: userId},
          {
            operator: 'or',
            criteria: [
              {fieldName: 'assignedTo.id', operator: '!=', value: userId},
              {fieldName: 'assignedTo', operator: 'isNull'},
            ],
          },
        ],
      });
    }
  }

  return criteria;
};

export async function searchTeamTasks({
  searchValue,
  selectedStatus,
  selectedPriority,
  selectedScope,
  userId,
  page = 0,
  filterDomain,
}: {
  searchValue?: string;
  selectedStatus?: any[];
  selectedPriority?: any[];
  selectedScope?: string;
  userId?: number;
  page?: number;
  filterDomain?: any;
}) {
  const domainData: any =
    selectedScope === TeamTaskScope.scope.Observed && userId != null
      ? {
          domain:
            "EXISTS (SELECT 1 FROM MailFollower f WHERE f.relatedModel = 'com.axelor.team.db.TeamTask' AND f.relatedId = self.id AND f.user.id = :userId)",
          domainContext: {userId},
        }
      : {};

  return createStandardSearch({
    model: MODEL,
    criteria: createTeamTaskCriterias({
      searchValue,
      selectedStatus,
      selectedPriority,
      selectedScope,
      userId,
    }),
    ...domainData,
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
    model: MODEL,
    id,
    fieldKey: 'team_teamTask',
    provider: 'model',
  });
}

export async function saveTeamTask(body: any) {
  const {matchers, formattedData} = formatRequestBody(body, 'data');

  return getActionApi().send({
    url: `/ws/rest/${MODEL}`,
    method: 'post',
    body: {data: formattedData},
    description: 'save team task',
    matchers: {
      modelName: MODEL,
      id: body?.id ?? Date.now(),
      fields: matchers,
    },
  });
}

export async function updateTeamTaskStatus({
  id,
  version,
  status,
}: {
  id: number;
  version: number;
  status: string;
}) {
  return getActionApi().send({
    url: `/ws/rest/${MODEL}`,
    method: 'post',
    body: {data: {id, version, status}},
    description: 'update team task status',
    matchers: {
      modelName: MODEL,
      id,
      fields: {'data.status': 'status'},
    },
  });
}

export async function deleteTeamTask({id}: {id: number}) {
  return getActionApi().send({
    url: `/ws/rest/${MODEL}/${id}`,
    method: 'delete',
    body: {},
    description: 'delete team task',
    matchers: {modelName: MODEL, id, fields: {}},
  });
}
