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

export async function updateInventoryLineDetails({
  inventoryLineId,
  version,
  realQty,
  description = null,
}) {
  return axios.put(`/ws/aos/inventory-line/${inventoryLineId}`, {
    version: version,
    realQty: realQty,
    description: description,
  });
}

export async function createInventoryLine({
  inventoryId,
  inventoryVersion,
  productId,
  trackingNumberId = null,
  rack = null,
  realQty,
}) {
  return axios.post('/ws/aos/inventory-line/', {
    inventoryId: inventoryId,
    inventoryVersion: inventoryVersion,
    productId: productId,
    trackingNumberId: trackingNumberId,
    rack: rack,
    realQty: realQty,
  });
}
