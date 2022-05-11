import axios from 'axios';
import {getApiResponseData, getFirstData} from '@/api/utils';

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
    fields: ['id', 'trackingNumberSeq'],
    sortBy: ['id', 'trackingNumberSeq'],
    limit: 20,
    offset: 0,
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
      fields: ['id', 'trackingNumberSeq'],
      sortBy: ['id', 'trackingNumberSeq'],
      limit: 1,
      offset: 0,
    })
    .then(getApiResponseData)
    .then(getFirstData);
}
