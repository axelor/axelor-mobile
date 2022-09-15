import axios from 'axios';

const companyFields = ['code', 'name', 'id'];

export async function searchCompany() {
  return axios.post('/ws/rest/com.axelor.apps.base.db.Company/search', {
    data: null,
    fields: companyFields,
    limit: null,
    offset: 0,
  });
}
