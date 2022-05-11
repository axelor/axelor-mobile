import axios from 'axios';

export async function searchUser() {
  return axios.post('/ws/rest/com.axelor.auth.db.User/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'code',
              operator: '=',
              value: 'admin',
            },
          ],
        },
      ],
    },
    fields: ['name', 'language', 'workshopStockLocation', 'activeCompany'],
    sortBy: ['name'],
    limit: 20,
    offset: 0,
  });
}
