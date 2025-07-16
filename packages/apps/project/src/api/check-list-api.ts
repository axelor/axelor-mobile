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
  getActionApi,
  createStandardSearch,
  getSearchCriterias,
  Criteria,
} from '@axelor/aos-mobile-core';

const createCheckListCriterias = ({
  searchValue,
  parentKey,
  parentId,
  parentItemId,
  noParent,
  selectedStatus,
}) => {
  const criteria: Criteria[] = [
    getSearchCriterias('project_checkListItem', searchValue),
  ];

  if (noParent) {
    criteria.push({
      fieldName: 'parentItem',
      operator: 'isNull',
    });
  }

  if (parentItemId != null) {
    criteria.push({
      fieldName: 'parentItem.id',
      operator: '=',
      value: parentItemId,
    });
  } else {
    criteria.push({
      fieldName: `${parentKey}.id`,
      operator: '=',
      value: parentId,
    });
  }

  if (Array.isArray(selectedStatus) && selectedStatus.length > 0) {
    criteria.push({
      fieldName: 'completed',
      operator: '=',
      value: selectedStatus[0].key,
    });
  }

  return criteria;
};

export async function searchCheckListItems({
  searchValue,
  parentKey,
  parentId,
  parentItemId,
  noParent = false,
  selectedStatus,
  isBranch = false,
  page = 0,
}: {
  searchValue?: string;
  parentKey: string;
  parentId: number;
  parentItemId?: number;
  noParent?: boolean;
  selectedStatus?: any[];
  isBranch?: boolean;
  page?: number;
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.project.db.ProjectCheckListItem',
    criteria: createCheckListCriterias({
      searchValue,
      parentKey,
      parentId,
      parentItemId,
      noParent,
      selectedStatus,
    }),
    domain: isBranch ? 'self.projectCheckListItemList IS NOT EMPTY' : undefined,
    fieldKey: 'project_checkListItem',
    sortKey: 'project_checkListItem',
    page,
  });
}

export async function updateCheckListItem({
  id,
  version,
  completed,
}: {
  id: number;
  version: number;
  completed: boolean;
}) {
  return getActionApi().send({
    method: 'put',
    url: `/ws/aos/check-list-item/${id}`,
    body: {version, completed},
    description: 'update check list item',
    matchers: {
      id,
      modelName: 'com.axelor.apps.project.db.ProjectCheckListItem',
      fields: {completed: 'completed'},
    },
  });
}
