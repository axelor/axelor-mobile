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

import React, {useCallback, useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Camera as PackageCamera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';
import {formatScan} from '../../../utils/formatters';
import {
  disableCameraScanner,
  scanBarcode,
  useCameraScannerSelector,
} from '../../../features/cameraScannerSlice';

const CameraScanner = () => {
  const {isEnabled: isActive} = useCameraScannerSelector();
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(disableCameraScanner());
  }, [dispatch]);

  useEffect(() => {
    if (isActive) {
      requestPermission();
    }
  }, [isActive]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: barcode => {
      if (Array.isArray(barcode) && barcode[0] != null) {
        dispatch(
          scanBarcode({
            value: formatScan(barcode[0].value, barcode[0].type),
            type: barcode[0].type,
          }),
        );
      }
    },
  });

  if (!hasPermission || !isActive) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Icon
        name="x-lg"
        size={24}
        color={Colors.primaryColor.background}
        touchable={true}
        onPress={handleClose}
        style={styles.icon}
      />
      <PackageCamera
        style={styles.camera}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 700,
  },
  camera: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    zIndex: 750,
  },
  icon: {
    zIndex: 800,
    position: 'absolute',
    right: 30,
    top: 60,
  },
});

export default CameraScanner;
