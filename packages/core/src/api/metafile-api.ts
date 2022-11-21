import {axiosApiProvider} from '../axios/AxiosApi';

const MetaFileFields = ['id', 'fileName', 'createdOn'];

const createCriteria = listFiles => {
  if (listFiles != null) {
    let criterias = [];
    listFiles.forEach(item => {
      criterias.push({fieldName: 'id', operator: '=', value: item.id});
    });
    return criterias;
  }
};

interface fetchFileDetailsProps {
  listFiles: [any];
  isMetaFile?: boolean;
}

export async function fetchFileDetails({
  listFiles,
  isMetaFile,
}: fetchFileDetailsProps) {
  const model = isMetaFile
    ? 'com.axelor.meta.db.MetaFile'
    : 'com.axelor.dms.db.DMSFile';
  return axiosApiProvider.post({
    url: `/ws/rest/${model}/search`,
    data: {
      data: {
        criteria: [
          {
            operator: 'or',
            criteria: createCriteria(listFiles),
          },
        ],
      },
      fields: MetaFileFields,
      limit: null,
      offset: 0,
    },
  });
}
