/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const handleDocumentSelection = async (
  onChange: (file: any) => void,
  documentTypesAllowed: string = 'allFiles',
) => {
  try {
    const file: DocumentPickerResponse = await DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      type: DocumentPicker.types[documentTypesAllowed],
    });

    const base64Data = await RNFS.readFile(file.uri, 'base64');

    onChange({
      name: file.name,
      dateTime: new Date().toISOString(),
      type: file.type,
      size: file.size,
      base64: base64Data,
      fullBase64: `data:${file.type};base64,${base64Data}`,
    });
  } catch (err) {
    console.warn(err);
  }
};
