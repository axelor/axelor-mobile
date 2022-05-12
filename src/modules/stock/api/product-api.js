import axios from 'axios';
import {getApiResponseData, getFirstData} from '@/api/utils';

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
      'picture',
      'trackingNumberConfiguration',
      'salesUnit',
      'unit',
      'length',
      'purchasesUnit',
      'description',
      'height',
      'width',
      'productCategory',
      'netMass',
      'grossMass',
      'procurementMethodSelect',
      'isUnrenewed',
      'isPrototype',
      'productVariant',
      'picture',
      'serialNUmber',
      'trackingNumberConfiguration',
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

export function searchProductBySerialNumber(serialNumber) {
  return axios
    .post('/ws/rest/com.axelor.apps.base.db.Product/search', {
      data: {
        criteria: [
          {
            fieldName: 'serialNumber',
            operator: '=',
            value: serialNumber,
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
      limit: 1,
      offset: 0,
    })
    .then(getApiResponseData)
    .then(getFirstData);
}
