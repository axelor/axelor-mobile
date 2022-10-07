import {axiosApiProvider} from '@aos-mobile/core';
import StockLocation from '../types/stock-location';

const stockLocationLineFields = [
  'id',
  'rack',
  'stockLocation',
  'product',
  'currentQty',
  'futureQty',
  'reservedQty',
  'unit',
];

export async function searchStockLocationLine({
  stockId,
  productId,
  companyId,
  page = 0,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.StockLocationLine/search',
    data:
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
        : companyId == null
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
                      fieldName: 'stockLocation.typeSelect',
                      operator: '=',
                      value: StockLocation.type.internal,
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
  });
}
