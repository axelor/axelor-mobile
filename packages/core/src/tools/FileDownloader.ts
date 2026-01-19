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

import {PermissionsAndroid, Platform} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {TranslatorProps} from '../i18n/hooks/use-translator';
import {sanitizeFileName, showToastMessage} from '../utils';

interface FileItem {
  fileName: string;
  id: number;
  isMetaFile?: boolean;
}

interface ConnexionNeed {
  baseUrl: string;
  token: string;
  jsessionId?: string;
}

const getFileExtension = (filename: string) => {
  if (filename == null) {
    return filename;
  }

  return filename.split('.').pop();
};

async function getUniqueFileName(
  basePath: string,
  fileName: string,
): Promise<string> {
  const extension = getFileExtension(fileName);
  const baseName = sanitizeFileName(fileName)?.replaceAll(`.${extension}`, '');

  let filePath: string = `${basePath}/${baseName}.${extension}`;
  let counter = 1;

  while (await RNFS.exists(filePath)) {
    filePath = `${basePath}/${baseName}(${counter}).${extension}`;
    counter++;
  }

  return filePath;
}

async function requestStoragePermission(I18n: TranslatorProps) {
  if (Platform.OS === 'ios') {
    return true;
  }

  if (Number(Platform.Version) >= 33) {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: I18n.t('Base_StoragePermissionRequired'),
        message: I18n.t('Base_StoragePermissionDetails'),
        buttonPositive: I18n.t('Base_OK'),
        buttonNegative: I18n.t('Base_Cancel'),
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('error while requesting storage permission', err);
    return false;
  }
}

export const downloadFileOnPhone = async (
  file: FileItem,
  authentification: ConnexionNeed,
  I18n: TranslatorProps,
) => {
  if (file == null) return;

  const hasPermission = await requestStoragePermission(I18n);

  if (!hasPermission) {
    showToastMessage({
      type: 'error',
      position: 'bottom',
      text1: I18n.t('Base_Error'),
      text2: I18n.t('Base_DownloadPermissionDenied'),
    });
    return;
  }

  const {config, fs} = RNFetchBlob;

  const downloadUrl = file.isMetaFile
    ? `${authentification.baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${
        file.id
      }/content/download`
    : `${authentification.baseUrl}ws/dms/download/${file.id}`;

  const downloadPath = await getUniqueFileName(
    Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.LegacyDownloadDir,
    file.fileName,
  );

  const result = await config({
    fileCache: true,
    path: downloadPath,
    IOSBackgroundTask: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: file.fileName,
      path: downloadPath,
      description: 'Downloading file...',
      mediaScannable: true,
    },
  })
    .fetch('GET', downloadUrl, {
      Cookie: `CSRF-TOKEN=${authentification.token}; ${authentification.jsessionId}`,
    })
    .then(async res => {
      if (Platform.OS === 'ios') {
        await Share.open({
          url: 'file://' + res.path(),
          saveToFiles: true,
        }).catch(console.error);
      }

      showToastMessage({
        type: 'success',
        position: 'bottom',
        text1: I18n.t('Base_Success'),
        text2: I18n.t(
          Platform.OS === 'ios' ? 'Base_FileDownloadiOS' : 'Base_FileDownload',
        ),
      });

      return true;
    })
    .catch(() => {
      showToastMessage({
        type: 'error',
        position: 'bottom',
        text1: I18n.t('Base_Error'),
        text2: I18n.t('Base_ErrorOnDownload'),
      });

      return false;
    });

  return result;
};
