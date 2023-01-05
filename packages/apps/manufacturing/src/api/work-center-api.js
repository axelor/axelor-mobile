import {axiosApiProvider} from '@axelor/aos-mobile-core';

const workCenterFields = ['code', 'name'];

const createWorkCenterCriteria = searchValue => {
  let criterias = [];
  if (searchValue != null) {
    criterias.push({
      fieldName: 'name',
      operator: 'like',
      value: searchValue,
    });
  }
  return criterias;
};

export async function searchWorkCenterFilter({searchValue = null}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.production.db.WorkCenter/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createWorkCenterCriteria(searchValue),
          },
        ],
      },
      fields: workCenterFields,
    },
  });
}
