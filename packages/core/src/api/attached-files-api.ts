import {axiosApiProvider} from '../axios/AxiosApi';
import {fetchFileDetails} from './metafile-api';

export async function fetchAttachedFiles({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return axiosApiProvider
    .get({url: `/ws/dms/attachments/${model}/${modelId}`})
    .then(response => {
      if (response?.data?.data == null) {
        return response;
      } else {
        return fetchFileDetails(response?.data?.data);
      }
    });
}
