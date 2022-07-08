import axios from 'axios';

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
  return axios.post('/ws/rest/com.axelor.dms.db.DMSFile/search', {
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
  });
}
