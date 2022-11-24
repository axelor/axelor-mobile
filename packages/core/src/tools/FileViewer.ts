import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import {TranslatorProps} from '../i18n/hooks/use-translator';
import {showToastMessage} from '../utils/show-toast-message';

interface fileItemProps {
  fileName: string;
  id: number;
  isMetaFile?: boolean;
}

interface ConnexionNeed {
  baseUrl: string;
  token: string;
  jsessionId?: string;
}

export const openFileInExternalApp = async (
  file: fileItemProps,
  authentification: ConnexionNeed,
  I18n: TranslatorProps,
) => {
  const localFile = `${RNFS.DocumentDirectoryPath}/${file?.fileName}`;
  const options = {
    fromUrl: file.isMetaFile
      ? `${authentification.baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${file?.id}/content/download`
      : `${authentification.baseUrl}ws/dms/inline/${file?.id}`,
    toFile: localFile,
    headers: {
      Cookie: `CSRF-TOKEN=${authentification.token}; ${authentification.jsessionId}`,
    },
  };

  RNFS.downloadFile(options)
    .promise.then(() => FileViewer.open(localFile, {showOpenWithDialog: true}))
    .then(() => {
      // success
    })
    .catch(error => {
      // error
      showToastMessage({
        type: 'error',
        position: 'bottom',
        text1: I18n.t('Auth_Error'),
        text2: I18n.t('Auth_CannotOpenFile'),
      });
      console.log(error);
    });
};
