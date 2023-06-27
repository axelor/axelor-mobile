/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {
  CircleButton,
  Text,
  getCommonStyles,
  useThemeColor,
  ThemeColors,
} from '@axelor/aos-mobile-ui';
import {uploadFile} from '../../../api/metafile-api';
import {useTranslator} from '../../../i18n';

interface UploadFileInputProps {
  style?: any;
  onUpload?: (file: any) => void;
  returnBase64String?: boolean;
  required?: boolean;
  title?: string;
  documentTypesAllowed?: 'images' | 'pdf' | 'allFiles';
}

const UploadFileInput = ({
  style,
  onUpload = console.log,
  returnBase64String = false,
  required = false,
  documentTypesAllowed = 'allFiles',
  title,
}: UploadFileInputProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const [selectedFile, setSelectedFile] = useState(null);

  const _required = useMemo(
    () => required && selectedFile == null,
    [required, selectedFile],
  );

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const styles = useMemo(
    () => getStyles(Colors, _required),
    [Colors, _required],
  );

  const handleDocumentPick = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: DocumentPicker.types[documentTypesAllowed],
      });

      setSelectedFile(file);

      handleFileUpload(file);
    } catch (error) {
      console.log('Document picking error:', error);
    }
  };

  const handleFileUpload = async (file: DocumentPickerResponse) => {
    try {
      const response = await uploadFile(file, {
        baseUrl,
        token,
        jsessionId,
        returnBase64String,
      });
      onUpload(response);
    } catch (error) {
      console.log('Could not upload the file:', error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        commonStyles.filter,
        commonStyles.filterSize,
        commonStyles.filterAlign,
        style,
      ]}>
      <Text style={styles.fileName}>
        {selectedFile
          ? selectedFile.name
          : title
          ? title
          : I18n.t('Base_ChooseFile')}
      </Text>
      <CircleButton iconName="plus" size={30} onPress={handleDocumentPick} />
    </View>
  );
};

const getStyles = (Colors: ThemeColors, _required: boolean) =>
  StyleSheet.create({
    container: {
      borderColor: _required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
    },
    fileName: {
      width: '90%',
    },
  });

export default UploadFileInput;
