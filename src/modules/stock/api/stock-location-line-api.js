import axios from 'axios';

export async function searchStockLocationLine(productId,stockLocationId,companyId) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockLocationLine/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'product.id',
              operator: '=',
              value: productId
            },
          ],
        },
        {
            operator:'or',
            criteria:[
                {
                    fieldName: 'detailsStockLocation.id',
                    operator: '=',
                    value: stockLocationId
                },
                {
                    fieldName: 'stockLocation.id',
                    operator: '=',
                    value: stockLocationId
                }
            ]
        }
      ],
    },
    fields: ['id','stockLOcation','currentQty','futureQty','reservedQty'],
    sortBy: ['id', 'name'],
    limit: 20,
    offset: 0,
  });
}
