import {axiosApiProvider} from '@axelor/aos-mobile-core';

const productionFileFields = ['image', 'description'];
const sortByFields = ['sequence'];

const createProductionFileCriteria = prodProcessLineId => {
  let criterias = [];

  if (prodProcessLineId != null) {
    criterias.push({
      fieldName: 'prodProcessLine.id',
      operator: '=',
      value: prodProcessLineId,
    });
  }

  return criterias;
};

export async function searchProductionFile({
  prodProcessLineId = null,
  page = 0,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.production.db.ObjectDescription/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createProductionFileCriteria(prodProcessLineId),
          },
        ],
      },
      fields: productionFileFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}
