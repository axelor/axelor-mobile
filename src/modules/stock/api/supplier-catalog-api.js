import axios from 'axios';

export async function searchSupplierProduct({supplierId, productId}) {
  return axios.post(
    '/ws/rest/com.axelor.apps.purchase.db.SupplierCatalog/search',
    {
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
  );
}
