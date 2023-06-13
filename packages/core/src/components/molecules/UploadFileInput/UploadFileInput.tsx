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

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {CircleButton, Text} from '@axelor/aos-mobile-ui';
import {uploadFile} from '../../../api/metafile-api';
import {useTranslator} from '../../../i18n';

interface UploadFileInputProps {
  style?: any;
  onUpload?: (file: any) => void;
}

const UploadFileInput = ({
  style,
  onUpload = console.log,
}: UploadFileInputProps) => {
  const I18n = useTranslator();

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleDocumentPick = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles, DocumentPicker.types.images],
      });

      setSelectedFile(file);

      handleFileUpload(file);
    } catch (error) {
      console.log('Document picking error:', error);
    }
  };

  const handleFileUpload = async (file: DocumentPickerResponse) => {
    try {
      const response = await uploadFile(file, {baseUrl, token, jsessionId});
      onUpload(response);
    } catch (error) {
      console.log('Could not upload the file:', error);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.fileName}>
        {selectedFile ? selectedFile.name : I18n.t('Base_ChooseFile')}
      </Text>
      <CircleButton iconName="plus" size={30} onPress={handleDocumentPick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 18,
  },
  fileName: {
    width: '90%',
  },
});

export default UploadFileInput;
