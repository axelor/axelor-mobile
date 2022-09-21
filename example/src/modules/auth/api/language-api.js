import axios from 'axios';

export async function searchLanguage() {
  return axios.get('/ws/rest/com.axelor.apps.base.db.Language/');
}
