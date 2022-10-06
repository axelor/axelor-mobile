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
