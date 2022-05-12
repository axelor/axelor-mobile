import axios from 'axios';

// TYPE SELECT
const TYPE_INTERNAL = 1;
const TYPE_OUTGOING = 2;
const TYPE_INCOMING = 3;

export async function searchInternalMove() {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockMove/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'typeSelect',
              operator: '=',
              value: TYPE_INTERNAL,
            },
          ],
        },
      ],
    },
    fields: [
      'name',
      'stockMoveSeq',
      'statusSelect',
      'availableStatusSelect',
      'toStockLocation',
      'fromStockLocation',
      'origin',
      'createdOn',
      'realDate',
      'estimatedDate',
      'stockMoveLineList',
      'note',
    ],
    sortBy: ['stockMoveSeq'],
    limit: 100,
    offset: 0,
  });
}
