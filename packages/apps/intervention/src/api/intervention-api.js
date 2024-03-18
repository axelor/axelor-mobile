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
  getEndOfDay,
  getSearchCriterias,
  getStartOfDay,
} from '@axelor/aos-mobile-core';

const createInterventionCriteria = (searchValue, userId, date, statusList) => {
  const criteria = [
    getSearchCriterias('intervention_intervention', searchValue),
  ];

  if (userId != null) {
    criteria.push({
      fieldName: 'assignedTo.employee.user.id',
      operator: '=',
      value: userId,
    });
  }

  if (date != null) {
    const startDate = getStartOfDay(date).toISOString();
    const endDate = getEndOfDay(date).toISOString();

    criteria.push({
      operator: 'and',
      criteria: [
        {
          fieldName: 'planifStartDateTime',
          operator: '>=',
          value: startDate,
        },
        {
          fieldName: 'planifStartDateTime',
          operator: '<=',
          value: endDate,
        },
      ],
    });
  }

  if (Array.isArray(statusList) && statusList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: statusList.map(status => ({
        fieldName: 'statusSelect',
        operator: '=',
        value: status,
      })),
    });
  }

  return criteria;
};

export async function fetchIntervention({
  searchValue,
  userId,
  date,
  statusList,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.Intervention',
    criteria: createInterventionCriteria(searchValue, userId, date, statusList),
    fieldKey: 'intervention_intervention',
    sortKey: 'intervention_intervention',
    page,
  });
}
