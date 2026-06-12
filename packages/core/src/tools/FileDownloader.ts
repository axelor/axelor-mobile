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

import {TranslatorProps} from '../i18n/hooks/use-translator';
import {FileApiCredentials, FileRef} from '../apiProviders';
import {
  buildCookie,
  metaFileDownloadUrl,
  saveUrlToDevice,
} from '../apiProviders/File/utils';

export const downloadFileOnPhone = async (
  file: FileRef,
  credentials: FileApiCredentials,
  I18n: TranslatorProps,
): Promise<boolean> => {
  if (file == null || credentials?.baseUrl == null) {
    return false;
  }

  return saveUrlToDevice(
    metaFileDownloadUrl(credentials.baseUrl, file),
    file.fileName,
    buildCookie(credentials),
    I18n.t,
  );
};
