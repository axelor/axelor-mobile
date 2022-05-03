import axios from 'axios';

export async function searchCompany() {
  return axios.get('/ws/rest/com.axelor.apps.base.db.Company/');
}
