import axios from 'axios';
import StockMove from '@/modules/stock/types/stock-move';

export async function searchInternalMove() {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockMove/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'typeSelect',
              operator: '=',
              value: StockMove.status.internal,
            },
          ],
        },
      ],
    },
    fields: [
      'name',
      'stockMoveSeq',
      'statusSelect',
      'availableStatusSelect',
      'toStockLocation',
      'fromStockLocation',
      'origin',
      'createdOn',
      'realDate',
      'estimatedDate',
      'stockMoveLineList',
      'note',
    ],
    sortBy: ['stockMoveSeq'],
    limit: 100,
    offset: 0,
  });
}

export async function createInternalStockMove(data) {
  return axios.post('ws/aos/stock-move/internal/', {
    productId: data.productId,
    companyId: data.companyId,
    originStockLocationId: data.originStockLocationId,
    destStockLocationId: data.destStockLocationId,
    unitId: data.unitId,
    trackingNumberId: data.trackingNumberId,
    movedQty: data.movedQty,
  });
}

export async function updateInternalStockMove(data) {
  return axios.put(`/ws/aos/stock-move/internal/${data.internalMoveId}`, {
    movedQty: data.movedQty,
    unitId: data.unitId,
    status: data.status,
  });
}
