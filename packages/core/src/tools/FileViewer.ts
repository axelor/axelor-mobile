/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import RNFetchBlob from 'react-native-blob-util';
import RNFS from 'react-native-fs';
import {TranslatorProps} from '../i18n/hooks/use-translator';
import {sanitizeLocalFileName, showToastMessage} from '../utils';

interface FileItem {
  fileName: string;
  id: number;
  isMetaFile?: boolean;
}

interface PathItem {
  fileName: string;
  path: string;
}

interface ConnexionNeed {
  baseUrl: string;
  token: string;
  jsessionId?: string;
}

export const openFileInExternalApp = async (
  file: FileItem | PathItem,
  authentification: ConnexionNeed,
  I18n: TranslatorProps,
) => {
  if (file == null) {
    return;
  }

  const localFile = `${RNFS.DocumentDirectoryPath}/${sanitizeLocalFileName(
    file.fileName,
  )}`;

  const fromUrl =
    (file as PathItem).path != null
      ? `${authentification.baseUrl}${(file as PathItem).path}`
      : (file as FileItem).isMetaFile
        ? `${authentification.baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${
            (file as FileItem).id
          }/content/download`
        : `${authentification.baseUrl}ws/dms/inline/${(file as FileItem).id}`;

  try {
    const res = await RNFetchBlob.config({path: localFile}).fetch(
      'GET',
      fromUrl,
      {
        Cookie: `CSRF-TOKEN=${authentification.token}; ${authentification.jsessionId}`,
      },
    );
    const {status} = res.info();

    if (status < 200 || status >= 300) {
      await RNFS.unlink(localFile).catch(() => {});
      throw new Error(`Download failed with status ${status}`);
    }

    await FileViewer.open(localFile, {showOpenWithDialog: true});
  } catch (error) {
    showToastMessage({
      type: 'error',
      position: 'bottom',
      text1: I18n.t('Auth_Error'),
      text2: I18n.t('Auth_CannotOpenFile'),
    });
    console.log(error);
  }
};
