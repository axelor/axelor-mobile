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

import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  checkNullString,
  getCommonStyles,
  Icon,
  IconInput,
  Text,
  ThemeColors,
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
  onChange = () => {},
  scanKeySearch,
}: {
  style?: any;
  title?: string;
  placeholder?: string;
  defaultValue?: string;
  readonly?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
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
    (_v: string) => {
      setInputData(_v);
      onChange(_v);
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

  const _required = useMemo(
    () => required && (inputData == null || inputData === ''),
    [required, inputData],
  );

  const styles = useMemo(
    () => getStyles(Colors, _required),
    [Colors, _required],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required),
    [Colors, _required],
  );

  useEffect(() => {
    setInputData(defaultValue);
  }, [defaultValue]);

  return (
    <View style={[styles.container, style]}>
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      <IconInput
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          styles.content,
        ]}
        placeholder={placeholder}
        value={inputData}
        onChange={handleValueChange}
        readOnly={readonly}
        required={required}
        onSelection={enableScanner}
        onEndFocus={() => {}}
        rightIconsList={[
          <Icon
            name="arrow-counterclockwise"
            size={20}
            visible={inputData !== defaultValue}
            touchable={!readonly}
            style={styles.icon}
            onPress={() => handleValueChange(defaultValue)}
          />,
          <Icon
            name="qr-code-scan"
            size={20}
            color={
              !readonly && scannerEnabled && scanKey === scanKeySearch
                ? Colors.primaryColor.background
                : Colors.secondaryColor_dark.background
            }
            touchable={!readonly}
            style={styles.icon}
            onPress={onScanPress}
          />,
        ]}
        isScannableInput
      />
    </View>
  );
};

const getStyles = (Colors: ThemeColors, required: boolean) =>
  StyleSheet.create({
    container: {
      width: '90%',
      minHeight: 62,
      alignSelf: 'center',
    },
    content: {
      width: '100%',
      borderColor: required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
      marginHorizontal: 0,
      minHeight: 40,
    },
    title: {
      marginLeft: 10,
    },
    icon: {
      width: '7%',
      margin: 3,
    },
  });

export default InputBarCodeCard;
