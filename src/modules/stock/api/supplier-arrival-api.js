import axios from 'axios';
import StockMove from '../types/stock-move';

const supplierArrivalsFields = [
  'id',
  'availlableStatusSelect',
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
  'partner',
  'statusSelect',
  'realDate',
  'estimatedDate',
  'toStockLocation',
  'fromAddress',
];

const sortByFields = [
  'statusSelect',
  '-realDate',
  'estimatedDate',
  'stockMoveSeq',
];

export async function searchSupplierArrival({page = 0}) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockMove/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'isReversion',
              operator: '=',
              value: false,
            },
            {
              fieldName: 'typeSelect',
              operator: '=',
              value: StockMove.type.incoming,
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
          ],
        },
      ],
    },

    fields: supplierArrivalsFields,
    sortBy: sortByFields,
    limit: 10,
    offset: 10 * page,
  });
}

export async function searchSupplierArrivalFilter({searchValue, page = 0}) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockMove/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'isReversion',
              operator: '=',
              value: false,
            },
            {
              fieldName: 'typeSelect',
              operator: '=',
              value: StockMove.type.incoming,
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
            {
              fieldName: 'stockMoveSeq',
              operator: 'like',
              value: searchValue,
            },
          ],
        },
      ],
    },

    fields: supplierArrivalsFields,
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
  conformity = StockMove.conformity.None,
}) {
  return axios.post(`/ws/aos/stock-move/add-line/${stockMoveId}`, {
    productId: productId,
    unitId: unitId,
    trackingNumberId: trackingNumberId,
    expectedQty: expectedQty,
    realQty: realQty,
    conformity: conformity,
  });
}

export async function realizeSockMove({stockMoveId, version}) {
  return axios.put(`/ws/aos/stock-move/realize/${stockMoveId}`, {
    version: version,
  });
}
