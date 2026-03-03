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

import React, {useCallback, useEffect, useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CircleButton, useConfig, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  CameraPhoto,
  clearPhoto,
  enableCamera,
  useCameraValueByKey,
} from '../../../features/cameraSlice';
import {uploadBase64} from '../../../api/metafile-api';

const CameraButton = ({
  size = 70,
  cameraKey,
  onUpload,
  returnBase64 = false,
  getFileName,
}: {
  size?: number;
  cameraKey: string;
  onUpload: (_file: any) => void;
  returnBase64?: boolean;
  getFileName?: (data: {
    user: any;
    extension: string;
    dateTime: string;
  }) => string;
}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {setActivityIndicator} = useConfig();

  const cameraPicture = useCameraValueByKey(cameraKey);
  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);
  const {user} = useSelector((state: any) => state.user);

  const styles = useMemo(() => getStyles(Colors, size), [Colors, size]);

  const handleCameraPress = useCallback(() => {
    dispatch(enableCamera(cameraKey));
  }, [cameraKey, dispatch]);

  const handleNext = useCallback(
    _file => {
      setActivityIndicator(false);
      onUpload(_file);
    },
    [onUpload, setActivityIndicator],
  );

  const handleCameraUpload = useCallback(
    async (photo: CameraPhoto) => {
      try {
        const _file = {
          name: getFileName
            ? getFileName({
                user,
                dateTime: photo.dateTime,
                extension: photo.pictureExtention,
              })
            : `Camera_${user.name}_${photo.dateTime}.${photo.pictureExtention}`,
          type: photo.type,
          size: photo.size,
          base64: photo.base64,
        };

        if (returnBase64) {
          handleNext(_file);
          return;
        }

        const response = await uploadBase64(_file, {
          baseUrl,
          token,
          jsessionId,
        });

        handleNext(response);
      } catch (error) {
        console.log('Could not upload the file:', error);
      }
    },
    [baseUrl, getFileName, handleNext, jsessionId, returnBase64, token, user],
  );

  useEffect(() => {
    if (cameraPicture) {
      setActivityIndicator(true);
      handleCameraUpload(cameraPicture);
      dispatch(clearPhoto());
    }
  }, [cameraPicture, dispatch, handleCameraUpload, setActivityIndicator]);

  return (
    <CircleButton
      isNeutralBackground
      style={styles.floatingButton}
      iconName="camera-fill"
      onPress={handleCameraPress}
      size={size}
    />
  );
};

const getStyles = (Colors, buttonSize) =>
  StyleSheet.create({
    floatingButton: {
      position: 'absolute',
      left: Dimensions.get('window').width / 2 - buttonSize / 2,
      bottom: 25,
      elevation: 2,
      borderWidth: 0,
    },
  });

export default CameraButton;
