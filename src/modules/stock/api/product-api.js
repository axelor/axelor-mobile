import axios from 'axios';

export async function searchProduct() {
  return axios.post('/ws/rest/com.axelor.apps.base.db.Product/search', {
    data: {
      // Criteria from request /stock.root.products/list/1
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
    fields: ['name', 'code','picture', 'trackingNumberConfiguration','salesUnit','unit','length','purchasesUnit','description','height','width',
    'productCategory','netMass','grossMass','procurementMethodSelect','isUnrenewed','isPrototype'],
    sortBy: ['code', 'name'],
    limit: 100,
    offset: 0,
  });
}
