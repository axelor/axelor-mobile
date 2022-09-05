import axios from 'axios';

export async function getBaseConfig() {
  return axios.get('/ws/rest/com.axelor.apps.base.db.AppBase/');
}
