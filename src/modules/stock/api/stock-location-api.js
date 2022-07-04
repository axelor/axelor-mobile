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

export async function searchStockLocationsFilter({searchValue, page = 0}) {
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
            {
              operator: 'or',
              criteria: [
                {
                  fieldName: 'name',
                  operator: 'like',
                  value: searchValue,
                },
                {
                  fieldName: 'serialNumber',
                  operator: 'like',
                  value: searchValue,
                },
              ],
            },
          ],
        },
      ],
    },
    fields: stockLocationFields,
    sortBy: ['id', 'name'],
    limit: 10,
    offset: 10 * page,
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
