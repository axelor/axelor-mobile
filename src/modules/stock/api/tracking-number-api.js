import axios from 'axios';
import {getApiResponseData, getFirstData} from '@/api/utils';

const trackingNumberFields = ['id', 'trackingNumberSeq', 'serialNumber'];

export async function searchTrackingNumber(productId) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.TrackingNumber/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'product.id',
              operator: '=',
              value: productId,
            },
          ],
        },
      ],
    },
    fields: trackingNumberFields,
    sortBy: ['id', 'trackingNumberSeq'],
    limit: 50,
    offset: 0,
  });
}

export async function searchTrackingNumberFilter({
  productId,
  searchValue,
  page = 0,
}) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.TrackingNumber/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'product.id',
              operator: '=',
              value: productId,
            },
            {
              operator: 'or',
              criteria: [
                {
                  fieldName: 'trackingNumberSeq',
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
    fields: trackingNumberFields,
    sortBy: ['id', 'trackingNumberSeq'],
    limit: 10,
    offset: 10 * page,
  });
}

export function searchTrackingNumberBySerialNumber(serialNumber) {
  return axios
    .post('/ws/rest/com.axelor.apps.stock.db.TrackingNumber/search', {
      data: {
        criteria: [
          {
            fieldName: 'serialNumber',
            operator: '=',
            value: serialNumber,
          },
        ],
      },
      fields: trackingNumberFields,
      sortBy: ['id', 'trackingNumberSeq'],
      limit: 1,
      offset: 0,
    })
    .then(getApiResponseData)
    .then(getFirstData);
}
