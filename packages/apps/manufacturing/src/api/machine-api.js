import {axiosApiProvider} from '@axelor/aos-mobile-core';

const machineFields = ['code', 'name'];

const createMachineCriteria = searchValue => {
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

export async function searchMachineFilter({searchValue = null}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.production.db.Machine/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createMachineCriteria(searchValue),
          },
        ],
      },
      fields: machineFields,
    },
  });
}
