import axios from 'axios';

export async function getLoggedUser(userId) {
  return axios.get(`/ws/rest/com.axelor.auth.db.User/${userId}`);
}

export async function postUser(user) {
  return axios.post('/ws/rest/com.axelor.auth.db.User', {
    data: user,
  });
}
