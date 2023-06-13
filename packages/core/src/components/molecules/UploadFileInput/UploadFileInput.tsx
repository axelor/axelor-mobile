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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {Text} from '@axelor/aos-mobile-ui';
import {uploadFile} from '../../../api/metafile-api';

interface UploadFileInputProps {
  style?: any;
}

const UploadFileInput = ({style}: UploadFileInputProps) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDocumentPick = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile(file);

      handleFileUpload(file);
    } catch (error) {
      console.log('Document picking error:', error);
    }
  };

  const handleFileUpload = async (file: DocumentPickerResponse) => {
    try {
      const response = await uploadFile(file);
      console.log(
        'response',
        response.status,
        JSON.stringify(response.data, null, 2),
      );
    } catch (error) {
      console.log('Could not upload the file:', error);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={handleDocumentPick}
        style={styles.uploadButtonContainer}>
        <View style={styles.uploadButton}>
          <Text style={styles.buttonText}>Choose File</Text>
        </View>
      </TouchableOpacity>
      {selectedFile && <Text style={styles.fileName}>{selectedFile.name}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  uploadButton: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonContainer: {
    width: '90%',
  },
  buttonText: {
    height: 20,
    fontWeight: 'bold',
  },
  fileName: {
    width: '90%',
    height: 20,
    marginTop: 10,
  },
});

export default UploadFileInput;
