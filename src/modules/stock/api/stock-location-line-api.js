import axios from 'axios';
import StockLocation from '../types/stock-location';

const stockLocationLineFields = [
  'id',
  'rack',
  'stockLocation',
  'product',
  'currentQty',
  'futureQty',
  'unit',
];

export async function searchStockLocationLine({
  stockId,
  productId,
  companyId,
  page = 0,
}) {
  return axios.post(
    '/ws/rest/com.axelor.apps.stock.db.StockLocationLine/search',
    stockId != null
      ? {
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
                    fieldName: 'stockLocation.id',
                    operator: '=',
                    value: stockId,
                  },
                ],
              },
            ],
          },
          fields: stockLocationLineFields,
          limit: 10,
          offset: 10 * page,
        }
      : {
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
                    fieldName: 'stockLocation.typeSelect',
                    operator: '=',
                    value: StockLocation.type.internal,
                  },
                  {
                    fieldName: 'stockLocation.company.id',
                    operator: '=',
                    value: companyId,
                  },
                ],
              },
            ],
          },
          fields: stockLocationLineFields,
          limit: 10,
          offset: 10 * page,
        },
  );
}
