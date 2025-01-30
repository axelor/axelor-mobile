/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
