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
        return fetchFileDetails({
          listFiles: response?.data?.data,
          isMetaFile: false,
        });
      }
    });
}

export async function countAttachments({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.dms.db.DMSFile/search',
    data: {
      data: {
        _domain:
          'self.relatedModel = :name AND self.relatedId = :id ' +
          'AND COALESCE(self.isDirectory, FALSE) = FALSE',
        _domainContext: {
          name: model,
          id: modelId,
        },
      },
      fields: ['id'],
    },
  });
}
