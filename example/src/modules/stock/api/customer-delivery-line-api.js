import axios from 'axios';

const customerDeliveryLineFields = [
  'id',
  'product',
  'availableStatusSelect',
  'trackingNumber',
  'unit',
  'qty',
  'realQty',
  'locker',
  'name',
];

export async function searchCustomerDeliveryLines({
  page = 0,
  customerDeliveryId,
}) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockMoveLine/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'stockMove.id',
              operator: '=',
              value: customerDeliveryId,
            },
          ],
        },
      ],
    },
    fields: customerDeliveryLineFields,
    sortBy: ['id'],
    limit: 10,
    offset: 10 * page,
  });
}

export async function updateLine({stockMoveLineId, version, realQty}) {
  return axios.put(`/ws/aos/stock-move-line/${stockMoveLineId}`, {
    version: version,
    realQty: realQty,
  });
}
