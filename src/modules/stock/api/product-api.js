import axios from 'axios';

export async function searchProduct() {
  return axios.post('/ws/rest/com.axelor.apps.base.db.Product/search', {
    data: {
      // Criteria from request /stock.root.products/list/1
      criteria: [
        {
          fieldName: 'isModel',
          operator: '=',
          value: false,
        },
        {
          fieldName: 'productTypeSelect',
          operator: '=',
          value: 'storable',
        },
        {
          fieldName: 'dtype',
          operator: '=',
          value: 'Product',
        },
      ],
    },
    fields: ['name', 'code'],
    sortBy: ['code', 'name'],
    limit: 20,
    offset: 0,
  });
}
