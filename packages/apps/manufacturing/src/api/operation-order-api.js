import {axiosApiProvider} from '@aos-mobile/core';
import OperationOrder from '../types/operation-order';

const operationOrderListFields = [
  'id',
  'operationName',
  'statusSelect',
  'priority',
  'workCenter',
  'plannedDuration',
  'manufOrder',
  'machine',
  'plannedStartDateT',
  'plannedEndDateT',
  'realStartDateT',
  'realEndDateT',
  'operationOrderDurationList',
  'realDuration',
  'prodProcessLine',
];

const sortByFields = ['manufOrder.manufOrderSeq', 'statusSelect', 'priority'];

const createOperationOrderCriteria = (manufOrderId, searchValue) => {
  let criterias = [];
  criterias.push({
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
  });
  if (manufOrderId != null) {
    criterias.push({
      fieldName: 'manufOrder.id',
      operator: '=',
      value: manufOrderId,
    });
  }
  if (searchValue != null) {
    criterias.push({
      fieldName: 'manufOrder.manufOrderSeq',
      operator: 'like',
      value: searchValue,
    });
  }
  return criterias;
};

export async function searchOperationOrderFilter({
  manufOrderId = null,
  searchValue = null,
  page = 0,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.production.db.OperationOrder/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createOperationOrderCriteria(manufOrderId, searchValue),
          },
        ],
      },
      fields: operationOrderListFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function getOperationOrder(date) {
  const startMonth = date?.month;
  const endMonth = date?.month + 1;
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.production.db.OperationOrder/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: [
              {
                fieldName: 'plannedStartDateT',
                operator: '>=',
                value: `${date.year}-${startMonth
                  .toString()
                  .padStart(2, '0')}-01T00:00:00.000Z`,
              },
              {
                fieldName: 'plannedStartDateT',
                operator: '<=',
                value: `${date.year}-${endMonth
                  .toString()
                  .padStart(2, '0')}-31T23:59:00.000Z`,
              },
            ],
          },
        ],
      },
    },
  });
}

export async function fetchOperationOrder({operationOrderId}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.production.db.OperationOrder/${operationOrderId}/fetch`,
    data: {
      fields: operationOrderListFields,
      related: {
        operationOrderDurationList: ['startingDateTime', 'stoppingDateTime'],
        prodProcessLine: ['objectDescriptionList'],
      },
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
