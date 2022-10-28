import {axiosApiProvider} from '@aos-mobile/core';

export async function searchSupplierProduct({supplierId, productId}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.purchase.db.SupplierCatalog/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: [
              {
                fieldName: 'supplierPartner.id',
                operator: '=',
                value: supplierId,
              },
              {
                fieldName: 'product.id',
                operator: '=',
                value: productId,
              },
            ],
          },
        ],
      },
      fields: ['id', 'productSupplierName', 'productSupplierCode'],
      sortBy: ['id'],
      limit: 1,
      offset: 0,
    },
  });
}
