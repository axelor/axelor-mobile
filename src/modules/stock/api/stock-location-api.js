import axios from 'axios';
import {getApiResponseData, getFirstData} from '@/api/utils';
import StockLocation from '@/modules/stock/types/stock-location';

const stockLocationFields = [
  'name',
  'id',
  'serialNumber',
  'stockLocationLineList',
];

export async function searchStockLocation() {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockLocation/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'typeSelect',
              operator: '=',
              value: StockLocation.type.internal,
            },
            {
              fieldName: 'company.id',
              operator: '=',
              value: 1,
            },
          ],
        },
      ],
    },
    fields: stockLocationFields,
    sortBy: ['id', 'name'],
    limit: 20,
    offset: 0,
  });
}

export async function searchStockLocationBySerialNumber(serialNumber) {
  return axios
    .post('/ws/rest/com.axelor.apps.stock.db.StockLocation/search', {
      data: {
        criteria: [
          {
            fieldName: 'serialNumber',
            operator: '=',
            value: serialNumber,
          },
        ],
      },
      fields: stockLocationFields,
      limit: 1,
      offset: 0,
    })
    .then(getApiResponseData)
    .then(getFirstData);
}
export async function productStockLocation(data) {
  return axios.post(
    `/ws/aos/stock-product/fetch-product-with-stock/${data.productId}`,
    {companyId: data.companyId, stockLocationId: data.stockLocationId},
  );
}
