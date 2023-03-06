/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
  getNextMonth,
  getPreviousMonth,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';
import OperationOrder from '../types/operation-order';

const createOperationOrderCriteria = (manufOrderId, searchValue) => {
  let criterias = [
    {
      operator: 'OR',
      criteria: [
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: OperationOrder.status.Planned,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: OperationOrder.status.InProgress,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: OperationOrder.status.StandBy,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: OperationOrder.status.Finished,
        },
      ],
    },
    getSearchCriterias('manufacturing_operationOrder', searchValue),
  ];

  if (manufOrderId != null) {
    criterias.push({
      fieldName: 'manufOrder.id',
      operator: '=',
      value: manufOrderId,
    });
  }

  return criterias;
};

const createOperationOrderPlanningCriteria = date => {
  const startDate = getPreviousMonth(date).toISOString();
  const endDate = getNextMonth(date).toISOString();

  return [
    {
      operator: 'or',
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'plannedStartDateT',
              operator: '>=',
              value: startDate,
            },
            {
              fieldName: 'plannedStartDateT',
              operator: '<=',
              value: endDate,
            },
          ],
        },
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'plannedEndDateT',
              operator: '>=',
              value: startDate,
            },
            {
              fieldName: 'plannedStartDateT',
              operator: '<=',
              value: endDate,
            },
          ],
        },
      ],
    },
  ];
};

export async function searchOperationOrderFilter({
  manufOrderId = null,
  searchValue = null,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.OperationOrder',
    criteria: createOperationOrderCriteria(manufOrderId, searchValue),
    fieldKey: 'manufacturing_operationOrder',
    sortKey: 'manufacturing_operationOrder',
    page,
  });
}

export async function getPlannedOperationOrder(date) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.OperationOrder',
    criteria: createOperationOrderPlanningCriteria(date),
    fieldKey: 'manufacturing_operationOrder',
    sortKey: 'manufacturing_operationOrderPlanning',
    page: 0,
    limit: null,
  });
}

export async function fetchOperationOrder({operationOrderId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.production.db.OperationOrder',
    id: operationOrderId,
    fieldKey: 'manufacturing_operationOrder',
    relatedFields: {
      operationOrderDurationList: ['startingDateTime', 'stoppingDateTime'],
      prodProcessLine: ['objectDescriptionList'],
    },
  });
}

export async function updateOperationOrderStatus({
  operationOrderId,
  version,
  status,
}) {
  return axiosApiProvider.put({
    url: `ws/aos/operation-order/${operationOrderId}`,
    data: {
      version,
      status,
    },
  });
}
