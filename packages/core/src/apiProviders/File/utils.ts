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
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-blob-util';
import Share from 'react-native-share';
import FileViewer from 'react-native-file-viewer';
import {i18nProvider} from '../../i18n';
import {sanitizeFileName, showToastMessage} from '../../utils';
import {BinaryImageRef, FileApiCredentials, FileRef} from './FileApiProvider';

export type Translate = (key: string) => string;

const defaultTranslate: Translate = key => i18nProvider.i18n.t(key);

const META_FILE_MODEL = 'com.axelor.meta.db.MetaFile';

export function buildCookie(credentials?: FileApiCredentials): string {
  return `CSRF-TOKEN=${credentials?.token}; ${credentials?.jsessionId}`;
}

export function metaFileContentUrl(baseUrl: string, ref: FileRef): string {
  return ref.isMetaFile === false
    ? `${baseUrl}ws/dms/inline/${ref.id}`
    : `${baseUrl}ws/rest/${META_FILE_MODEL}/${ref.id}/content/download`;
}

export function metaFileDownloadUrl(baseUrl: string, ref: FileRef): string {
  return ref.isMetaFile === false
    ? `${baseUrl}ws/dms/download/${ref.id}`
    : `${baseUrl}ws/rest/${META_FILE_MODEL}/${ref.id}/content/download`;
}

export function binaryImageUrl(baseUrl: string, ref: BinaryImageRef): string {
  const versionParams =
    ref.version != null
      ? `v=${ref.version}&parentId=${ref.id}&parentModel=${ref.model}&`
      : '';
  return `${baseUrl}ws/rest/${ref.model}/${ref.id}/${ref.field}/download?${versionParams}image=true`;
}

function getFileExtension(fileName: string): string | undefined {
  return fileName?.split('.').pop();
}

export async function getUniqueFileName(
  basePath: string,
  fileName: string,
): Promise<string> {
  const extension = getFileExtension(fileName);
  const baseName = sanitizeFileName(fileName)?.replaceAll(`.${extension}`, '');

  let filePath = `${basePath}/${baseName}.${extension}`;
  let counter = 1;

  while (await RNFS.exists(filePath)) {
    filePath = `${basePath}/${baseName}(${counter}).${extension}`;
    counter++;
  }

  return filePath;
}

export async function requestStoragePermission(
  translate: Translate = defaultTranslate,
): Promise<boolean> {
  if (Platform.OS === 'ios' || Number(Platform.Version) >= 33) {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: translate('Base_StoragePermissionRequired'),
        message: translate('Base_StoragePermissionDetails'),
        buttonPositive: translate('Base_OK'),
        buttonNegative: translate('Base_Cancel'),
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
}

export async function openLocalFile(
  path: string,
  translate: Translate = defaultTranslate,
): Promise<void> {
  try {
    await FileViewer.open(path, {showOpenWithDialog: true});
  } catch {
    showToastMessage({
      type: 'error',
      position: 'bottom',
      text1: translate('Auth_Error'),
      text2: translate('Auth_CannotOpenFile'),
    });
  }
}

export async function downloadUrlToPath(
  url: string,
  toFile: string,
  cookie: string,
): Promise<string | null> {
  try {
    await RNFS.downloadFile({fromUrl: url, toFile, headers: {Cookie: cookie}})
      .promise;
    return toFile;
  } catch {
    return null;
  }
}

export async function saveUrlToDevice(
  url: string,
  fileName: string,
  cookie: string,
  translate: Translate = defaultTranslate,
): Promise<boolean> {
  if (!(await requestStoragePermission(translate))) {
    showToastMessage({
      type: 'error',
      position: 'bottom',
      text1: translate('Base_Error'),
      text2: translate('Base_DownloadPermissionDenied'),
    });
    return false;
  }

  const {config, fs} = RNFetchBlob;
  const dir =
    Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.LegacyDownloadDir;
  const path = await getUniqueFileName(dir, fileName);

  try {
    const res = await config({
      fileCache: true,
      path,
      IOSBackgroundTask: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: fileName,
        path,
        description: fileName,
        mediaScannable: true,
      },
    }).fetch('GET', url, {Cookie: cookie});

    if (Platform.OS === 'ios') {
      await Share.open({url: 'file://' + res.path(), saveToFiles: true}).catch(
        () => {},
      );
    }

    showToastMessage({
      type: 'success',
      position: 'bottom',
      text1: translate('Base_Success'),
      text2: translate(
        Platform.OS === 'ios' ? 'Base_FileDownloadiOS' : 'Base_FileDownload',
      ),
    });
    return true;
  } catch {
    showToastMessage({
      type: 'error',
      position: 'bottom',
      text1: translate('Base_Error'),
      text2: translate('Base_ErrorOnDownload'),
    });
    return false;
  }
}
