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

import React, {useEffect, useMemo, useState} from 'react';
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
  Image,
} from '@axelor/aos-mobile-ui';
import {deleteMetaFile, uploadFile} from '../../../api/metafile-api';
import {useTranslator} from '../../../i18n';
import {openFileInExternalApp} from '../../../tools';

const DEFAULT_MAX_FILE_SIZE = 5000000;

const isMetaFile = file => {
  return (
    typeof file === 'object' &&
    file?.id != null &&
    file?.version != null &&
    file?.fileName != null
  );
};

const formatFileSize = (size: number): string => {
  const _size = Math.abs(size);

  const labels: string[] = ['octets', 'ko', 'Mo', 'Go', 'To'];

  for (let i = 0; i < labels.length; i++) {
    if (_size < Math.pow(1000, i)) {
      return (_size / Math.pow(1000, i - 1)).toFixed(2) + ' ' + labels[i - 1];
    }
  }
};

interface UploadFileInputProps {
  style?: any;
  title?: string;
  defaultValue?: string | any;
  onUpload?: (file?: any) => void;
  returnBase64String?: boolean;
  required?: boolean;
  readonly?: boolean;
  documentTypesAllowed?: 'images' | 'pdf' | 'allFiles';
  canDeleteFile?: boolean;
  displayPreview?: boolean;
  maxSize?: number;
}

const UploadFileInput = ({
  style,
  title,
  defaultValue,
  onUpload = console.log,
  returnBase64String = false,
  required = false,
  readonly = false,
  documentTypesAllowed = 'allFiles',
  canDeleteFile = true,
  displayPreview = false,
  maxSize = DEFAULT_MAX_FILE_SIZE,
}: UploadFileInputProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const [selectedFile, setSelectedFile] = useState(defaultValue);
  const [sizeError, setSizeError] = useState<boolean>(false);

  const _required = useMemo(
    () => required && selectedFile == null,
    [required, selectedFile],
  );

  const _maxFileSize = useMemo(() => {
    if (maxSize == null) {
      return DEFAULT_MAX_FILE_SIZE;
    }
    return maxSize;
  }, [maxSize]);

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

      if (file.size < _maxFileSize) {
        setSizeError(false);
        handleFileUpload(file);
      } else {
        setSizeError(true);
      }
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

      setSelectedFile(
        returnBase64String
          ? {...file, base64: response}
          : {...file, ...response},
      );
      onUpload(response);
    } catch (error) {
      console.log('Could not upload the file:', error);
    }
  };

  const handleFileDelete = async () => {
    if (isMetaFile(selectedFile)) {
      try {
        await deleteMetaFile(selectedFile?.id);

        onUpload();
      } catch (error) {
        console.log('Could not delete the file:', error);
      }
    }

    setSelectedFile(null);
  };

  const handleFileView = async () => {
    await openFileInExternalApp(
      {
        fileName: selectedFile?.fileName,
        id: selectedFile?.id,
        isMetaFile: true,
      },
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
  };

  useEffect(() => {
    setSelectedFile(defaultValue);
  }, [defaultValue]);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          styles.content,
        ]}>
        {displayPreview && selectedFile != null ? (
          <Image
            imageSize={styles.imageSize}
            resizeMode="contain"
            source={
              isMetaFile(selectedFile)
                ? {
                    uri: `${baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${selectedFile?.id}/content/download`,
                  }
                : {uri: selectedFile?.base64}
            }
            defaultIconSize={60}
          />
        ) : null}
        <Text style={styles.fileName} numberOfLines={1}>
          {selectedFile ? selectedFile.name : I18n.t('Base_ChooseFile')}
        </Text>
        <View style={styles.buttons}>
          {canDeleteFile && selectedFile != null && !readonly && (
            <CircleButton
              iconName="times"
              size={30}
              onPress={handleFileDelete}
              style={styles.action}
            />
          )}
          {isMetaFile(selectedFile) && (
            <CircleButton
              iconName="expand-alt"
              size={30}
              onPress={handleFileView}
              style={styles.action}
            />
          )}
          {selectedFile == null && !readonly && (
            <CircleButton
              iconName="plus"
              size={30}
              onPress={handleDocumentPick}
              style={styles.action}
            />
          )}
        </View>
      </View>
      {sizeError && (
        <Text textColor={Colors.errorColor.background} style={styles.error}>
          {I18n.t('Base_FileSizeUploadError', {
            maxSize: formatFileSize(_maxFileSize),
          })}
        </Text>
      )}
    </View>
  );
};

const getStyles = (Colors: ThemeColors, _required: boolean) =>
  StyleSheet.create({
    container: {
      width: '90%',
      alignSelf: 'center',
    },
    content: {
      width: '100%',
      borderColor: _required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
      marginHorizontal: 0,
      height: null,
      minHeight: 40,
    },
    title: {
      marginLeft: 10,
    },
    fileName: {
      width: '60%',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    action: {
      marginHorizontal: 2,
    },
    imageSize: {
      height: 60,
      width: 60,
    },
    error: {
      marginLeft: 5,
    },
  });

export default UploadFileInput;
