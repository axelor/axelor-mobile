import axios from 'axios';

const stockCorrectionFields = [
  'statusSelect',
  'product',
  'stockLocation',
  'createdOn',
  'validationDateT',
  'trackingNumber',
  'realQty',
  'stockCorrectionReason',
];

const sortByFields = ['statusSelect', '-validationDateT', 'createdOn'];

export async function searchStockCorrection({page = 0}) {
  return axios.post(
    '/ws/rest/com.axelor.apps.stock.db.StockCorrection/search',
    {
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
  );
}

export async function createStockCorrection({
  productId,
  stockLocationId,
  reasonId,
  trackingNumberId,
  status,
  realQty,
}) {
  return axios.post('ws/aos/stock-correction/', {
    productId: productId,
    stockLocationId: stockLocationId,
    reasonId: reasonId,
    trackingNumberId: trackingNumberId,
    status: status,
    realQty: realQty,
  });
}

export async function updateStockCorrection({
  stockCorrectionId,
  version,
  realQty,
  status,
}) {
  return axios.put(`/ws/aos/stock-correction/${stockCorrectionId}`, {
    version: version,
    realQty: realQty,
    status: status,
  });
}
