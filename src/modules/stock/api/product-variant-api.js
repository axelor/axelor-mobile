import axios from 'axios';

export async function searchProduct(productVariantParentId) {
  return axios.post('/ws/rest/com.axelor.apps.base.db.Product/search', {
    data: {
      // Criteria from request /stock.root.products/list/1
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'parentProduct.id',
              operator: '=',
              value: productVariantParentId,
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
      'parentProduct',
    ],
    limit: 20,
    offset: 0,
  });
}
