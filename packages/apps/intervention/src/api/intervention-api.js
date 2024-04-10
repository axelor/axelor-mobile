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
  createStandardFetch,
  createStandardSearch,
  getEndOfDay,
  getSearchCriterias,
  getStartOfDay,
} from '@axelor/aos-mobile-core';
import {Intervention} from '../types';

const createInterventionCriteria = (
  searchValue,
  userId,
  deliveredPartnerId,
  date,
  statusList,
) => {
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

  if (deliveredPartnerId != null) {
    criteria.push({
      fieldName: 'deliveredPartner.id',
      operator: '=',
      value: deliveredPartnerId,
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

const createInterventionHistoryCriteria = (statusList, equipmentId) => {
  const criteria = [];

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
  deliveredPartnerId,
  date,
  statusList,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.Intervention',
    criteria: createInterventionCriteria(
      searchValue,
      userId,
      deliveredPartnerId,
      date,
      statusList,
    ),
    fieldKey: 'intervention_intervention',
    sortKey: 'intervention_intervention',
    page,
  });
}

export async function fetchInterventionById({interventionId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.intervention.db.Intervention',
    id: interventionId,
    fieldKey: 'intervention_intervention',
  });
}

export async function searchHistoryInterventionByEquipment({
  page,
  statusList,
  equipmentId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.Intervention',
    criteria: createInterventionHistoryCriteria(statusList, equipmentId),
    domain: ':equipment MEMBER OF self.equipmentSet',
    domainContext: {
      equipment: {
        id: equipmentId,
      },
    },
    fieldKey: 'intervention_intervention',
    sortKey: 'intervention_intervention',
    page,
  });
}

export async function fetchActiveIntervention({userId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.Intervention',
    criteria: createInterventionCriteria(null, userId, null, null, [
      Intervention.status.Started,
    ]),
    fieldKey: 'intervention_intervention',
    sortKey: 'intervention_intervention',
    numberElementsByPage: 1,
    page: 0,
  });
}
