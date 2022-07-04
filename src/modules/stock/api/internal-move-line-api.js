import axios from 'axios';

const internalMoveLineFields = [
  'id',
  'product',
  'availableStatusSelect',
  'trackingNumber',
  'unit',
  'qty',
  'realQty',
];

export async function searchInternalMoveLines({internalMoveId, page = 0}) {
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
    fields: internalMoveLineFields,
    sortBy: ['id'],
    limit: 10,
    offset: 10 * page,
  });
}
