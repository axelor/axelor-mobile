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
  getActionApi,
  getNextMonth,
  getPreviousMonth,
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';

const createOperationOrderCriteria = (
  searchValue,
  manufOrderId,
  statusList,
  workCenterId,
  machineId,
) => {
  const OperationOrder = getTypes().OperationOrder;

  let criterias = [
    {
      operator: 'OR',
      criteria: [
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: OperationOrder?.statusSelect.Planned,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: OperationOrder?.statusSelect.InProgress,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: OperationOrder?.statusSelect.StandBy,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: OperationOrder?.statusSelect.Finished,
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

  if (Array.isArray(statusList) && statusList.length > 0) {
    criterias.push({
      operator: 'or',
      criteria: statusList.map(status => ({
        fieldName: 'statusSelect',
        operator: '=',
        value: status.key,
      })),
    });
  }

  if (workCenterId != null) {
    criterias.push({
      fieldName: 'workCenter.id',
      operator: '=',
      value: workCenterId,
    });
  }

  if (machineId != null) {
    criterias.push({
      fieldName: 'machine.id',
      operator: '=',
      value: machineId,
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
  searchValue = null,
  manufOrderId = null,
  statusList,
  workCenterId,
  machineId,
  companyId,
  page = 0,
  filterDomain,
}) {
  return createStandardSearch({
    filter: filterDomain,
    model: 'com.axelor.apps.production.db.OperationOrder',
    companyId,
    companyFieldName: 'manufOrder.company',
    criteria: createOperationOrderCriteria(
      searchValue,
      manufOrderId,
      statusList,
      workCenterId,
      machineId,
    ),
    fieldKey: 'manufacturing_operationOrder',
    sortKey: 'manufacturing_operationOrder',
    page,
    provider: 'model',
  });
}

export async function getPlannedOperationOrder({date, companyId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.OperationOrder',
    companyId,
    companyFieldName: 'manufOrder.company',
    criteria: createOperationOrderPlanningCriteria(date),
    fieldKey: 'manufacturing_operationOrder',
    sortKey: 'manufacturing_operationOrderPlanning',
    page: 0,
    numberElementsByPage: null,
    provider: 'model',
  });
}

export async function fetchOperationOrder({operationOrderId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.production.db.OperationOrder',
    id: operationOrderId,
    fieldKey: 'manufacturing_operationOrder',
    relatedFields: {
      operationOrderDurationList: [
        'startingDateTime',
        'stoppingDateTime',
        'startedBy',
      ],
      prodProcessLine: ['objectDescriptionList'],
    },
    provider: 'model',
  });
}

export async function updateOperationOrderStatus({
  operationOrderId,
  version,
  status,
}) {
  return getActionApi().send({
    url: `ws/aos/operation-order/${operationOrderId}`,
    method: 'put',
    body: {
      version,
      status,
    },
    description: 'update operation order status',
    matchers: {
      id: operationOrderId,
      modelName: 'com.axelor.apps.production.db.OperationOrder',
      fields: {
        status: 'statusSelect',
      },
    },
  });
}
