import axios from 'axios';

export async function searchUnit() {
  return axios.get('/ws/rest/com.axelor.apps.base.db.Unit');
}
