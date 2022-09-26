import axios from 'axios';

interface ApiCallProps {
  url: string;
  data?: any;
}

class AxiosApiProvider {
  constructor() {}

  post({url, data}: ApiCallProps): Promise<any> {
    return axios.post(url, data);
  }

  put({url, data}: ApiCallProps): Promise<any> {
    return axios.put(url, data);
  }

  get({url}: ApiCallProps): Promise<any> {
    return axios.get(url);
  }
}

export const axiosApiProvider = new AxiosApiProvider();
