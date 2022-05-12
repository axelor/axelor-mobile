import axios from 'axios';

export async function searchStockLocationLine(data) {
  console.log(data);
  return axios.post('/ws/rest/com.axelor.apps.stock.db.StockLocationLine/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'product.id',
              operator: '=',
              value: data.productId
            },
            {
              fieldName: 'stockLocation.id',
              operator: '=',
              value: data.stockId
          }
          ],
        },
        {
            operator:'or',
            criteria:[
               
               
            ]
        }
      ],
    },
    fields: ['id','rack','detailsStockLocation.id','stockLocation.id','product.id'],
    limit: 20,
    offset: 0,
  });
}
