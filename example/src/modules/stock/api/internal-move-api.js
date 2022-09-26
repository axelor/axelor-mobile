import StockMove from '@/modules/stock/types/stock-move';
import {axiosApiProvider} from '@aos-mobile/core';

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

const createSearchCriteria = searchValue => {
  const criteria = [];
  criteria.push({
    fieldName: 'typeSelect',
    operator: '=',
    value: StockMove.type.internal,
  });

  if (searchValue != null) {
    criteria.push({
      fieldName: 'stockMoveSeq',
      operator: 'like',
      value: searchValue,
    });
  }
  return criteria;
};

export async function searchInternalMoveFilter({searchValue = null, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.StockMove/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createSearchCriteria(searchValue),
          },
        ],
      },
      fields: internalMoveFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
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
  return axiosApiProvider.post({
    url: 'ws/aos/stock-move/internal/',
    data: {
      productId: productId,
      companyId: companyId,
      originStockLocationId: originStockLocationId,
      destStockLocationId: destStockLocationId,
      unitId: unitId,
      trackingNumberId: trackingNumberId,
      movedQty: movedQty,
    },
  });
}

export async function updateInternalStockMove({
  internalMoveId,
  version,
  movedQty,
  unitId,
  status,
}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-move/internal/${internalMoveId}`,
    data: {
      version: version,
      movedQty: movedQty,
      unitId: unitId,
      status: status,
    },
  });
}
