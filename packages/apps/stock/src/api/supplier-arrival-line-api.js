import {axiosApiProvider} from '@axelor/aos-mobile-core';
import StockMove from '../types/stock-move';

const supplierArrivalLineFields = [
  'id',
  'product',
  'availableStatusSelect',
  'trackingNumber',
  'unit',
  'qty',
  'realQty',
  'locker',
  'name',
  'conformitySelect',
];

export async function searchSupplierArrivalLines({
  supplierArrivalId,
  page = 0,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.StockMoveLine/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: [
              {
                fieldName: 'stockMove.id',
                operator: '=',
                value: supplierArrivalId,
              },
            ],
          },
        ],
      },
      fields: supplierArrivalLineFields,
      sortBy: ['id'],
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function updateLine({
  stockMoveLineId,
  version,
  realQty,
  conformity = StockMove.conformity.None,
}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-move-line/${stockMoveLineId}`,
    data: {
      version: version,
      realQty: realQty,
      conformity: conformity,
    },
  });
}
