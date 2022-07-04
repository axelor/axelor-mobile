import axios from 'axios';

export async function getLoggedUser() {
  return axios.get(`/ws/rest/com.axelor.auth.db.User/${global.userId}`);
}
