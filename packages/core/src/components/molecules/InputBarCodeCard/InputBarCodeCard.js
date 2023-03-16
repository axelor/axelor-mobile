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

import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Icon, IconInput, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  enableScan,
  useScannedValueByKey,
  useScannerSelector,
} from '../../../features/scannerSlice';
import {
  enableCameraScanner,
  useCameraScannerValueByKey,
} from '../../../features/cameraScannerSlice';

const InputBarCodeCard = ({
  style,
  scanKeySearch,
  title,
  defaultValue,
  readOnly = false,
  onChange = () => {},
}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState(defaultValue);

  const {isEnabled: scannerEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(scanKeySearch);
  const scanData = useCameraScannerValueByKey(scanKeySearch);

  useEffect(() => {
    if (scannedValue) {
      setInputData(scannedValue);
      onChange(scannedValue);
    } else if (scanData?.value != null) {
      setInputData(scanData.value);
      onChange(scanData.value);
    }
  }, [onChange, scanData, scannedValue]);

  return (
    <View style={style}>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.textImportant}>{title}</Text>
        </View>
      )}
      <IconInput
        style={style}
        value={inputData}
        onChange={onChange}
        readOnly={readOnly}
        onSelection={() => {
          dispatch(enableScan(scanKeySearch));
        }}
        rightIconsList={[
          <Icon
            name="qrcode"
            size={20}
            color={
              scannerEnabled && scanKey === scanKeySearch
                ? Colors.primaryColor.background
                : Colors.secondaryColor_dark.background
            }
            touchable={true}
            style={styles.icon}
            onPress={() => dispatch(enableCameraScanner(scanKeySearch))}
            FontAwesome5={false}
          />,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: 16,
  },
  textImportant: {
    fontWeight: 'bold',
  },
  icon: {
    width: '7%',
    margin: 3,
  },
});

export default InputBarCodeCard;
