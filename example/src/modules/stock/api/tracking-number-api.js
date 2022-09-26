import {getApiResponseData, getFirstData} from '@/api/utils';
import {axiosApiProvider} from '@aos-mobile/core';

const trackingNumberFields = ['id', 'trackingNumberSeq', 'serialNumber'];

export async function searchTrackingNumberFilter({
  productId,
  searchValue,
  page = 0,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.TrackingNumber/search',
    data: {
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
    },
  });
}

export function searchTrackingNumberBySerialNumber(serialNumber) {
  return axiosApiProvider
    .post({
      url: '/ws/rest/com.axelor.apps.stock.db.TrackingNumber/search',
      data: {
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
      },
    })
    .then(getApiResponseData)
    .then(getFirstData);
}

export async function createTrackingNumber({qty, product, trackingNumberSeq}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.TrackingNumber',
    data: {
      data: {
        counter: qty,
        product: product,
        trackingNumberSeq: trackingNumberSeq,
      },
    },
  });
}

export async function updateStockMoveLineTrackingNumber({
  stockMoveLineId,
  stockMoveLineVersion,
  trackingNumber,
}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.stock.db.StockMoveLine/${stockMoveLineId}`,
    data: {
      data: {
        id: stockMoveLineId,
        version: stockMoveLineVersion,
        trackingNumber: trackingNumber,
      },
    },
  });
}
