import axios from 'axios';
import StockMove from '../types/stock-move';

const deliveryFields = [
  'id',
  'availableStatusSelect',
  'filterOnAvailableProducts',
  'name',
  'stockMoveLineList',
  'stockMoveSeq',
  'fromStockLocation',
  'company',
  'originId',
  'origin',
  'toAddress',
  'createdOn',
  'estimatedDate',
  'realDate',
  'partner',
  'statusSelect',
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
  criteria.push(
    {
      fieldName: 'isReversion',
      operator: '=',
      value: false,
    },
    {
      fieldName: 'typeSelect',
      operator: '=',
      value: StockMove.type.outgoing,
    },
    {
      operator: 'OR',
      criteria: [
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: StockMove.status.Planned,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: StockMove.status.Realized,
        },
      ],
    },
  );

  if (searchValue) {
    criteria.push({
      fieldName: 'stockMoveSeq',
      operator: 'like',
      value: searchValue,
    });
  }
  return criteria;
};

export async function searchDeliveryFilter({searchValue = null, page = 0}) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockMove/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: createSearchCriteria(searchValue),
        },
      ],
    },
    fields: deliveryFields,
    sortBy: sortByFields,
    limit: 10,
    offset: 10 * page,
  });
}

export async function addLineStockMove({
  stockMoveId,
  productId,
  unitId,
  trackingNumberId,
  expectedQty,
  realQty,
}) {
  return axios.post(`/ws/aos/stock-move/add-line/${stockMoveId}`, {
    productId: productId,
    unitId: unitId,
    trackingNumberId: trackingNumberId,
    expectedQty: expectedQty,
    realQty: realQty,
    conformity: StockMove.conformity.None,
  });
}

export async function realizeSockMove({stockMoveId, version}) {
  return axios.put(`/ws/aos/stock-move/realize/${stockMoveId}`, {
    version: version,
  });
}
