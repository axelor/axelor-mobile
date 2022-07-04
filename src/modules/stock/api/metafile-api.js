import axios from 'axios';

export async function fetchFileDetails(fileId) {
  return axios.get(`/ws/rest/com.axelor.meta.db.MetaFile/${fileId}`);
}
