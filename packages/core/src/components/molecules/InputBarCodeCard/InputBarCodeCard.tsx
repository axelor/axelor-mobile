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

import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  checkNullString,
  Icon,
  IconInput,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useScannedValueByKey,
  useScannerSelector,
} from '../../../features/scannerSlice';
import {useCameraScannerValueByKey} from '../../../features/cameraScannerSlice';
import {
  useScanActivator,
  useScannerDeviceActivator,
} from '../../../hooks/use-scan-activator';

const InputBarCodeCard = ({
  style,
  title,
  placeholder,
  defaultValue,
  readonly = false,
  required = false,
  onChange,
  scanKeySearch,
}: {
  style?: any;
  title?: string;
  placeholder?: string;
  defaultValue?: string;
  readonly?: boolean;
  required?: boolean;
  onChange: (_v?: string) => void;
  scanKeySearch: string;
}) => {
  const Colors = useThemeColor();

  const {isEnabled: scannerEnabled, scanKey} = useScannerSelector();
  const {enable: onScanPress} = useScanActivator(scanKeySearch);
  const {enable: enableScanner} = useScannerDeviceActivator(scanKeySearch);
  const scannedValue = useScannedValueByKey(scanKeySearch);
  const scanData = useCameraScannerValueByKey(scanKeySearch);

  const [inputData, setInputData] = useState(defaultValue);

  const handleValueChange = useCallback(
    (_v?: string) => {
      setInputData(_v);
      onChange?.(_v);
    },
    [onChange],
  );

  useEffect(() => {
    if (scannedValue) {
      handleValueChange(scannedValue);
    } else if (scanData?.value != null) {
      handleValueChange(scanData.value);
    }
  }, [handleValueChange, scanData, scannedValue]);

  useEffect(() => {
    setInputData(defaultValue);
  }, [defaultValue]);

  return (
    <View style={[styles.container, style]}>
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      <IconInput
        style={styles.content}
        placeholder={placeholder}
        value={inputData}
        onChange={handleValueChange}
        readOnly={readonly}
        required={required}
        onSelection={enableScanner}
        rightIconsList={[
          <Icon
            name="arrow-counterclockwise"
            size={14}
            visible={inputData !== defaultValue}
            touchable={!readonly}
            onPress={() => handleValueChange(defaultValue)}
          />,
          <Icon
            name="qr-code-scan"
            size={14}
            color={
              !readonly && scannerEnabled && scanKey === scanKeySearch
                ? Colors.primaryColor.background
                : Colors.secondaryColor_dark.background
            }
            touchable={!readonly}
            onPress={onScanPress}
          />,
        ]}
        isScannableInput
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    marginLeft: 10,
  },
  content: {
    width: '100%',
    marginHorizontal: 0,
  },
});

export default InputBarCodeCard;
