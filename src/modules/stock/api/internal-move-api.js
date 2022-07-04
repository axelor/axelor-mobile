import axios from 'axios';
import StockMove from '@/modules/stock/types/stock-move';

const internalMoveFields = [
  'name',
  'stockMoveSeq',
  'statusSelect',
  'availableStatusSelect',
  'fromStockLocation',
  'toStockLocation',
  'origin',
  'createdOn',
  'realDate',
  'estimatedDate',
  'stockMoveLineList',
  'note',
  'pickingOrderComments',
];

const sortByFields = [
  'statusSelect',
  '-realDate',
  'estimatedDate',
  'stockMoveSeq',
];

export async function searchInternalMove({page = 0}) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockMove/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'typeSelect',
              operator: '=',
              value: StockMove.type.internal,
            },
          ],
        },
      ],
    },
    fields: internalMoveFields,
    sortBy: sortByFields,
    limit: 10,
    offset: 10 * page,
  });
}

export async function searchInternalMoveFilter({searchValue, page = 0}) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockMove/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'typeSelect',
              operator: '=',
              value: StockMove.type.internal,
            },
            {
              fieldName: 'stockMoveSeq',
              operator: 'like',
              value: searchValue,
            },
          ],
        },
      ],
    },
    fields: internalMoveFields,
    sortBy: sortByFields,
    limit: 10,
    offset: 10 * page,
  });
}

export async function createInternalStockMove({
  productId,
  companyId,
  originStockLocationId,
  destStockLocationId,
  unitId,
  trackingNumberId,
  movedQty,
}) {
  return axios.post('ws/aos/stock-move/internal/', {
    productId: productId,
    companyId: companyId,
    originStockLocationId: originStockLocationId,
    destStockLocationId: destStockLocationId,
    unitId: unitId,
    trackingNumberId: trackingNumberId,
    movedQty: movedQty,
  });
}

export async function updateInternalStockMove({
  internalMoveId,
  version,
  movedQty,
  unitId,
  status,
}) {
  return axios.put(`/ws/aos/stock-move/internal/${internalMoveId}`, {
    version: version,
    movedQty: movedQty,
    unitId: unitId,
    status: status,
  });
}
