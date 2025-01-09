/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  frameRateIncluded,
  sortFormats,
  useCameraDevices,
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
  const {isEnabled} = useCameraSelector();
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [flash, setFlash] = useState('off');
  const [enableNightMode, setEnableNightMode] = useState(false);
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices[cameraPosition];
  const dispatch = useDispatch();

  const formats = useMemo(() => {
    if (device?.formats == null) {
      return [];
    }
    return device.formats.sort(sortFormats);
  }, [device?.formats]);

  const fps = useMemo(() => {
    if (enableNightMode && !device?.supportsLowLightBoost) {
      // User has enabled Night Mode, but Night Mode is not natively supported, so we simulate it by lowering the frame rate.
      return 30;
    }

    const supportsHdrAt60Fps = formats.some(
      f =>
        f.supportsVideoHDR &&
        f.frameRateRanges.some(r => frameRateIncluded(r, 60)),
    );

    if (!supportsHdrAt60Fps) {
      // User has enabled HDR, but HDR is not supported at 60 FPS.
      return 30;
    }

    const supports60Fps = formats.some(f =>
      f.frameRateRanges.some(r => frameRateIncluded(r, 60)),
    );

    if (!supports60Fps) {
      // 60 FPS is not supported by any format.
      return 30;
    }

    // If nothing blocks us from using it, we default to 60 FPS.
    return 60;
  }, [device?.supportsLowLightBoost, enableNightMode, formats]);

  const supportsCameraFlipping = useMemo(
    () => devices.back != null && devices.front != null,
    [devices.back, devices.front],
  );

  const supportsFlash = device?.hasFlash ?? false;

  const canToggleNightMode = enableNightMode
    ? true
    : (device?.supportsLowLightBoost ?? false) || fps > 30; // either we have native support, or we can lower the FPS

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);

  const onFlashPressed = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  }, []);

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

  useEffect(() => {
    if (isEnabled) {
      (async () => {
        const status = await PackageCamera.requestCameraPermission();
        setHasPermission(status === 'authorized');
      })();
    }

    return () => setHasPermission(false);
  }, [isEnabled]);

  if (!hasPermission && !isEnabled) {
    return null;
  }

  return (
    <View style={styles.container}>
      {device != null && (
        <PackageCamera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
      )}
      <View style={styles.rightButtonRow}>
        {supportsCameraFlipping && (
          <Icon
            style={styles.button}
            name="camera"
            color={Colors.backgroundColor}
            size={24}
            touchable={true}
            onPress={onFlipCameraPressed}
          />
        )}
        {supportsFlash && (
          <Icon
            style={styles.button}
            name="flash"
            FontAwesome5={false}
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
        {canToggleNightMode && (
          <Icon
            style={styles.button}
            name={enableNightMode ? 'moon' : 'moon-o'}
            FontAwesome5={enableNightMode ? true : false}
            color={Colors.backgroundColor}
            size={24}
            touchable={true}
            onPress={() => setEnableNightMode(!enableNightMode)}
          />
        )}
        <Icon
          style={styles.button}
          name={'times'}
          color={Colors.backgroundColor}
          size={24}
          touchable={true}
          onPress={() => dispatch(disableCamera())}
        />
      </View>
      <View style={styles.captureButton}>
        <CaptureButton
          camera={camera}
          onMediaCaptured={onMediaCapture}
          flash={flash}
          enabled={isEnabled}
          type={PHOTO_TYPE}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 700,
  },
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
    zIndex: 750,
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
