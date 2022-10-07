import {axiosApiProvider} from '@aos-mobile/core';

const stockCorrectionFields = [
  'statusSelect',
  'product',
  'stockLocation',
  'createdOn',
  'validationDateT',
  'trackingNumber',
  'realQty',
  'baseQty',
  'stockCorrectionReason',
];

const sortByFields = ['statusSelect', '-validationDateT', 'createdOn'];

export async function searchStockCorrection({page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.StockCorrection/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: [],
          },
        ],
      },
      fields: stockCorrectionFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function createStockCorrection({
  productId,
  stockLocationId,
  reasonId,
  trackingNumberId,
  status,
  realQty,
}) {
  return axiosApiProvider.post({
    url: 'ws/aos/stock-correction/',
    data: {
      productId: productId,
      stockLocationId: stockLocationId,
      reasonId: reasonId,
      trackingNumberId: trackingNumberId,
      status: status,
      realQty: realQty,
    },
  });
}

export async function updateStockCorrection({
  stockCorrectionId,
  version,
  realQty,
  status,
}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-correction/${stockCorrectionId}`,
    data: {
      version: version,
      realQty: realQty,
      status: status,
    },
  });
}
