import axios from 'axios';
import {getApiResponseData, getFirstData} from '@/api/utils';

const TYPE_INTERNAL = 1;
const TYPE_EXTERNAL = 2;
const TYPE_VIRTUAL = 3;

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
              value: TYPE_INTERNAL,
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
    fields: ['name', 'id', 'serialNumber'],
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
      fields: ['id', 'name'],
      limit: 1,
      offset: 0,
    })
    .then(getApiResponseData)
    .then(getFirstData);
}
