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

import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Camera as PackageCamera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import RNFS from 'react-native-fs';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  disableCamera,
  takePhoto,
  useCameraSelector,
} from '../../../features/cameraSlice';
import CaptureButton from './CaptureButton';
import {
  disableCameraScanner,
  scanBarcode,
  useCameraScannerSelector,
} from '../../../features/cameraScannerSlice';
import {formatScan} from '../../../utils/formatters';

const CONTENT_SPACING = 40;
const PHOTO_TYPE = 'jpeg';

const SAFE_BOTTOM =
  Platform.select({
    ios: StaticSafeAreaInsets.safeAreaInsetsBottom,
  }) ?? 0;

const SAFE_AREA_PADDING = {
  paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft + CONTENT_SPACING,
  paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + CONTENT_SPACING * 1.5,
  paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight + CONTENT_SPACING / 2,
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

const BUTTON_SIZE = 40;

const Camera = () => {
  const Colors = useThemeColor();
  const {isEnabled: isScanActive} = useCameraScannerSelector();
  const {isEnabled: isCameraActive} = useCameraSelector();
  const {hasPermission, requestPermission} = useCameraPermission();
  const camera = useRef(null);
  const dispatch = useDispatch();

  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>(
    'back',
  );

  const [flash, setFlash] = useState<'off' | 'on'>('off');

  const deviceBack = useCameraDevice('back');

  const deviceFront = useCameraDevice('front');

  const device = useMemo(() => {
    return cameraPosition === 'back' ? deviceBack : deviceFront;
  }, [cameraPosition, deviceBack, deviceFront]);

  const supportsCameraFlipping = useMemo(
    () => deviceBack != null && deviceFront != null,
    [deviceBack, deviceFront],
  );

  const supportsFlash = device?.hasFlash ?? false;

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);

  const onFlashPressed = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: barcode => {
      if (isScanActive && Array.isArray(barcode) && barcode[0] != null) {
        dispatch(
          scanBarcode({
            value: formatScan(barcode[0].value, barcode[0].type),
            type: barcode[0].type,
          }),
        );
      }
    },
  });

  const onMediaCapture = useCallback(
    async photo => {
      const photoData = await RNFS.readFile(photo.path, 'base64');
      const {size} = await RNFS.stat(photo.path);

      dispatch(
        takePhoto({
          name: `camera.${PHOTO_TYPE}`,
          pictureExtention: PHOTO_TYPE,
          dateTime: new Date().toISOString(),
          type: `image/${PHOTO_TYPE}`,
          size: size,
          base64: photoData,
          fullBase64: `data:image/${PHOTO_TYPE};base64,${photoData}`,
        }),
      );
      dispatch(disableCamera());
    },
    [dispatch],
  );

  const handleClose = useCallback(() => {
    if (isCameraActive) {
      dispatch(disableCamera());
    } else {
      dispatch(disableCameraScanner());
    }
  }, [dispatch, isCameraActive]);

  useEffect(() => {
    if (isCameraActive || isScanActive) {
      requestPermission();
    }
  }, [isCameraActive, isScanActive, requestPermission]);

  const cameraVisible = useMemo(
    () => (hasPermission ? isCameraActive || isScanActive : false),
    [hasPermission, isCameraActive, isScanActive],
  );

  return (
    <View style={{zIndex: 700 * (cameraVisible ? 1 : -1)}}>
      {device != null && hasPermission && (
        <PackageCamera
          ref={camera}
          style={[styles.camera, {zIndex: 750 * (cameraVisible ? 1 : -1)}]}
          device={device}
          isActive={cameraVisible}
          photo={!isScanActive}
          codeScanner={codeScanner}
        />
      )}
      {cameraVisible ? (
        <View style={styles.rightButtonRow}>
          {supportsCameraFlipping && isCameraActive && (
            <Icon
              style={styles.button}
              name="camera-fill"
              color={Colors.backgroundColor}
              size={24}
              touchable={true}
              onPress={onFlipCameraPressed}
            />
          )}
          {supportsFlash && isCameraActive && (
            <Icon
              style={styles.button}
              name="lightning-fill"
              color={
                flash === 'on'
                  ? Colors.primaryColor.background
                  : Colors.backgroundColor
              }
              size={24}
              touchable={true}
              onPress={onFlashPressed}
            />
          )}
          <Icon
            style={styles.button}
            name="x-lg"
            color={Colors.backgroundColor}
            size={24}
            touchable={true}
            onPress={handleClose}
          />
        </View>
      ) : null}
      {cameraVisible && isCameraActive ? (
        <View style={styles.captureButton}>
          <CaptureButton
            camera={camera}
            onMediaCaptured={onMediaCapture}
            flash={flash}
            enabled={isCameraActive}
            type={PHOTO_TYPE}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  captureButton: {
    position: 'absolute',
    top: Dimensions.get('window').height - SAFE_AREA_PADDING.paddingBottom * 2,
    left: Dimensions.get('window').width / 2 - SAFE_AREA_PADDING.paddingLeft,
    zIndex: 850,
  },
  camera: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
    zIndex: 800,
  },
});

export default Camera;
