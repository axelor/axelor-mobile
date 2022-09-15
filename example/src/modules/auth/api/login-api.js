import axios from 'axios';

const loginPath = '/callback';

export async function loginApi(
  url: string,
  username: string,
  password: string,
): Promise<string> {
  return axios
    .post(`${url}${loginPath}`, {username, password})
    .then(response => {
      const token = response.headers['x-csrf-token'];
      const jsessionId = response.headers['set-cookie'][0].split(';')[0];
      if (token == null) {
        throw new Error('X-CSRF-Token is not exposed in remote header');
      }
      axios.interceptors.request.use(config => {
        config.baseURL = url;
        config.headers['x-csrf-token'] = token;
        return config;
      });
      return {token, jsessionId};
    });
}

export async function getActiveUserId() {
  const response = await axios.get('/ws/app/info');
  return response.data['user.id'];
}
