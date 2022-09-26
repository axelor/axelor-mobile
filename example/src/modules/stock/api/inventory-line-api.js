import {axiosApiProvider} from '@aos-mobile/core';

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
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.InventoryLine/search',
    data: {
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
    },
  });
}

export async function updateInventoryLineDetails({
  inventoryLineId,
  version,
  realQty,
  description = null,
}) {
  return axiosApiProvider.put({
    url: `/ws/aos/inventory-line/${inventoryLineId}`,
    data: {
      version: version,
      realQty: realQty,
      description: description,
    },
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
  return axiosApiProvider.post({
    url: '/ws/aos/inventory-line/',
    data: {
      inventoryId: inventoryId,
      inventoryVersion: inventoryVersion,
      productId: productId,
      trackingNumberId: trackingNumberId,
      rack: rack,
      realQty: realQty,
    },
  });
}
