import axios from 'axios';

export async function searchInternalMoveLines(internalMoveId) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockMoveLine/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'stockMove.id',
              operator: '=',
              value: internalMoveId,
            },
          ],
        },
      ],
    },
    fields: [
      'id',
      'product',
      'availableStatusSelect',
      'trackingNumber',
      'unit',
      'qty',
      'realQty',
    ],
    sortBy: ['id'],
    limit: 20,
    offset: 0,
  });
}
