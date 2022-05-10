import axios from 'axios';

export async function searchProduct() {
  return axios.post('/ws/rest/com.axelor.apps.base.db.Product/search', {
    data: {
      criteria: [
        {
          operator: 'and',
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
              fieldName: 'stockManaged',
              operator: '=',
              value: true,
            },
            {
              fieldName: 'dtype',
              operator: '=',
              value: 'Product',
            },
          ],
        },
      ],
    },
    fields: [
      'name',
      'code',
      'trackingNumberConfiguration',
      'serialNumber',
      'picture',
    ],
    sortBy: ['code', 'name'],
    limit: 50,
    offset: 0,
  });
}

export async function searchProductWithId(productId) {
  return axios.post(
    `/ws/rest/com.axelor.apps.base.db.Product/${productId}/fetch`,
    {
      fields: [
        'name',
        'code',
        'trackingNumberConfiguration',
        'serialNumber',
        'picture',
      ],
    },
  );
}
