import axios from 'axios';

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
