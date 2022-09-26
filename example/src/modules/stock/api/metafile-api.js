import {axiosApiProvider} from '@aos-mobile/core';

const createCriteria = listFiles => {
  if (listFiles != null) {
    let criterias = [];
    listFiles.forEach(item => {
      criterias.push({fieldName: 'id', operator: '=', value: item.id});
    });
    return criterias;
  }
};

const MetaFileFields = ['id', 'fileName', 'createdOn'];

export async function fetchFileDetails(listFiles) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.dms.db.DMSFile/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'or',
            criteria: createCriteria(listFiles),
          },
        ],
      },
      fields: MetaFileFields,
      limit: null,
      offset: 0,
    },
  });
}
