import axios from 'axios';

export async function getLoggedUser(userId) {
  return axios.get(`/ws/rest/com.axelor.auth.db.User/${userId}`);
}
