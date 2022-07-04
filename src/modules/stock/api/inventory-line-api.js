import axios from 'axios';

const inventoryLineFields = [
  'id',
  'product',
  'currentQty',
  'realQty',
  'unit',
  'rack',
  'trackingNumber',
  'description',
];

export async function searchInventoryLines({inventoryId, page = 0}) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.InventoryLine/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'inventory.id',
              operator: '=',
              value: inventoryId,
            },
          ],
        },
      ],
    },
    fields: inventoryLineFields,
    limit: 10,
    offset: 10 * page,
  });
}
