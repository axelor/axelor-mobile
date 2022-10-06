import {axiosApiProvider} from '@aos-mobile/core';

const createWasteProductCriteria = wasteProdProductList => {
  let criterias = [];
  if (wasteProdProductList != null && wasteProdProductList.length > 0) {
    wasteProdProductList.forEach(proProduct => {
      criterias.push({fieldName: 'id', operator: '=', value: proProduct?.id});
    });
  }
  return criterias;
};

export async function fetchManufacturingOrderWasteProducts({
  wasteProdProductList,
  page,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.production.db.ProdProduct/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'or',
            criteria: createWasteProductCriteria(wasteProdProductList),
          },
        ],
      },
      fields: ['id', 'product', 'qty', 'unit'],
      limit: 10,
      offset: 10 * page,
    },
  });
}
