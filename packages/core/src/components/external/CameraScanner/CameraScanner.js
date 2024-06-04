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

import React, {useCallback, useEffect, useState} from 'react';
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
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [shouldClose, setShouldClose] = useState(true);
  const [barcode, setBarcode] = useState(null);

  const handleClose = useCallback(() => {
    if (barcode != null) {
      dispatch(
        scanBarcode({
          value: formatScan(barcode[0].value, barcode[0].type),
          type: barcode[0].type,
        }),
      );
    } else {
      dispatch(disableCameraScanner());
    }
  }, [barcode, dispatch]);

  useEffect(() => {
    if (isActive) {
      requestPermission();
      setShouldClose(false);
      setBarcode(null);
    }
  }, [isActive, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: _barcode => {
      if (Array.isArray(_barcode) && _barcode[0] != null) {
        setBarcode(_barcode[0]);
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
        onPress={() => setShouldClose(true)}
        style={styles.icon}
      />
      <PackageCamera
        style={styles.camera}
        onStopped={handleClose}
        device={device}
        isActive={!shouldClose && barcode == null}
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
