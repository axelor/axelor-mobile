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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Text,
  getCommonStyles,
  useThemeColor,
  ThemeColors,
  Image,
  Icon,
} from '@axelor/aos-mobile-ui';
import {deleteMetaFile, uploadBase64} from '../../../api/metafile-api';
import {useFileApi} from '../../../apiProviders';
import {useTranslator} from '../../../i18n';
import {handleDocumentSelection} from '../../../tools';
import {checkNullString, useMetafileUri} from '../../../utils';
import {
  useCameraValueByKey,
  enableCamera,
  clearPhoto,
  CameraPhoto,
} from '../../../features/cameraSlice';

const DEFAULT_MAX_FILE_SIZE = 5000000;
const BUTTON_SIZE = 20;

const isMetaFile = file => {
  return (
    file != null &&
    typeof file === 'object' &&
    file?.id != null &&
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
  canTakePicture?: boolean;
  getFileName?: (extension: string, dateTime: string) => string;
  manageFileLocally?: boolean;
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
  canTakePicture = true,
  getFileName = (extension, dateTime) => `picture_${dateTime}.${extension}`,
  manageFileLocally = true,
}: UploadFileInputProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const fileApi = useFileApi();
  const formatMetafileURI = useMetafileUri();
  const dispatch = useDispatch();

  const cameraKey = useMemo(() => `${title}camera_upload`, [title]);

  const cameraPicture = useCameraValueByKey(cameraKey);
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

  const _enablePicture = useMemo(() => {
    if (!canTakePicture) {
      return false;
    }

    return documentTypesAllowed !== 'pdf';
  }, [canTakePicture, documentTypesAllowed]);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const styles = useMemo(
    () => getStyles(Colors, _required),
    [Colors, _required],
  );

  const handleCamera = () => {
    dispatch(enableCamera(cameraKey));
  };

  const handleUpload = useCallback(
    async (file: {
      name: string;
      type: string;
      size: number;
      base64: string;
    }) => {
      try {
        if (returnBase64String) {
          manageFileLocally && setSelectedFile(file);
          onUpload(file.base64);
          return;
        }

        const response = await uploadBase64(file, {
          baseUrl,
          token,
          jsessionId,
        });

        manageFileLocally && setSelectedFile({...file, ...response});
        onUpload(response);
      } catch (error) {
        console.log('Could not upload the file:', error);
      }
    },
    [
      baseUrl,
      jsessionId,
      manageFileLocally,
      onUpload,
      returnBase64String,
      token,
    ],
  );

  const handleDocumentPick = useCallback(
    async (file: any) => {
      const _file = {
        name: file.name,
        type: file.type,
        size: file.size,
        base64: returnBase64String ? file.fullBase64 : file.base64,
      };

      if (_file.size < _maxFileSize) {
        setSizeError(false);
        handleUpload(_file);
      } else {
        setSizeError(true);
      }
    },
    [_maxFileSize, handleUpload, returnBase64String],
  );

  const handleCameraUpload = useCallback(
    async (photo: CameraPhoto) => {
      const _file = {
        name: getFileName
          ? getFileName(photo.pictureExtention, photo.dateTime)
          : `picture_${photo.dateTime}.${photo.pictureExtention}`,
        type: photo.type,
        size: photo.size,
        base64: returnBase64String ? photo.fullBase64 : photo.base64,
      };

      handleUpload(_file);
    },
    [getFileName, handleUpload, returnBase64String],
  );

  const handleFileDelete = async () => {
    if (isMetaFile(selectedFile)) {
      try {
        await deleteMetaFile(selectedFile?.id);
      } catch (error) {
        console.log('Could not delete the file:', error);
      }
    }

    manageFileLocally && setSelectedFile(null);
    onUpload(null);
  };

  const handleFileView = async () => {
    await fileApi.openInExternalApp({
      id: selectedFile?.id,
      fileName: selectedFile?.fileName,
    });
  };

  useEffect(() => {
    if (cameraPicture) {
      handleCameraUpload(cameraPicture);
      dispatch(clearPhoto());
    }
  }, [cameraPicture, dispatch, handleCameraUpload]);

  useEffect(() => {
    setSelectedFile(defaultValue);
  }, [defaultValue]);

  const canDisplayPreview = useMemo(() => {
    if (isMetaFile(selectedFile) && selectedFile.fileName.includes('pdf')) {
      return false;
    }

    return displayPreview && selectedFile != null;
  }, [displayPreview, selectedFile]);

  const canDelete = useMemo(
    () => canDeleteFile && selectedFile != null && !readonly,
    [canDeleteFile, selectedFile, readonly],
  );
  const canView = useMemo(() => isMetaFile(selectedFile), [selectedFile]);
  const canCamera = useMemo(
    () => selectedFile == null && !readonly && _enablePicture,
    [selectedFile, readonly, _enablePicture],
  );
  const canUpload = useMemo(
    () => selectedFile == null && !readonly,
    [selectedFile, readonly],
  );


  return (
    <View style={[styles.container, style]}>
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      <View
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          styles.content,
        ]}>
        {canDisplayPreview ? (
          <Image
            imageSize={styles.imageSize}
            resizeMode="contain"
            source={
              isMetaFile(selectedFile)
                ? formatMetafileURI(selectedFile?.id)
                : {uri: selectedFile?.base64}
            }
            defaultIconSize={60}
          />
        ) : null}
        <Text
          style={selectedFile ? styles.value : styles.placeholder}
          numberOfLines={1}>
          {selectedFile
            ? selectedFile.name || selectedFile.fileName
            : I18n.t('Base_ChooseFile')}
        </Text>
        <View style={styles.buttons}>
          {[
            canDelete && (
              <Icon
                key="delete"
                name="x-lg"
                size={BUTTON_SIZE}
                color={Colors.primaryColor.background}
                touchable={true}
                onPress={handleFileDelete}
                style={styles.action}
              />
            ),
            canView && (
              <Icon
                key="view"
                name="arrows-angle-expand"
                size={BUTTON_SIZE}
                color={Colors.primaryColor.background}
                touchable={true}
                onPress={handleFileView}
                style={styles.action}
              />
            ),
            canCamera && (
              <Icon
                key="camera"
                name="camera-fill"
                size={BUTTON_SIZE}
                color={Colors.primaryColor.background}
                touchable={true}
                onPress={handleCamera}
                style={styles.action}
              />
            ),
            canUpload && (
              <Icon
                key="upload"
                name="upload"
                size={BUTTON_SIZE}
                color={Colors.primaryColor.background}
                touchable={true}
                onPress={() => handleDocumentSelection(handleDocumentPick)}
                style={styles.action}
              />
            ),
          ]
            .filter(Boolean)
            .reduce((acc: React.ReactNode[], icon, index) => {
              if (index > 0) {
                acc.push(<View key={`divider-${index}`} style={styles.divider} />);
              }
              acc.push(icon);
              return acc;
            }, [])}
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
    },
    title: {
      marginLeft: 10,
      fontSize: 13,
      fontWeight: '800',
      color: Colors.secondaryColor_dark.background,
    },
    placeholder: {
      flex: 1,
      fontSize: 15,
      fontWeight: '600',
      color: Colors.secondaryColor_dark.background,
    },
    value: {
      flex: 1,
      fontSize: 15,
      fontWeight: '700',
      color: Colors.text,
    },
    divider: {
      width: 1,
      height: 28,
      backgroundColor: Colors.secondaryColor.background_light,
      marginHorizontal: 8,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    action: {
      marginHorizontal: 4,
      color: Colors.primaryColor.background,
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
