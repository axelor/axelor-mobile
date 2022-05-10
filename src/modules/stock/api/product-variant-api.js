import axios from 'axios';

export async function searchProduct(productVariantId) {
  return axios.post('/ws/rest/com.axelor.apps.base.db.ProductVariant/search', {
    data: {
      // Criteria from request /stock.root.products/list/1
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'id',
              operator: '=',
              value: productVariantId,
            }
          ],
        },
      ],
    },
    fields: ['id','productVariantAttr1','productVariantAttr2','productVariantAttr3','productVariantAttr4','productVariantAttr5','productVariantValue1','productVariantValue2','productVariantValue3','productVariantValue4','productVariantValue5'],
    limit: 20,
    offset: 0,
  });
}
