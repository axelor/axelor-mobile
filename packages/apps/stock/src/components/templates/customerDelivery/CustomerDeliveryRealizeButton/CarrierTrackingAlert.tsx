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
import {StyleSheet} from 'react-native';
import {
  Alert,
  getCommonStyles,
  Icon,
  IconInput,
  ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useCameraScannerValueByKey,
  useScanActivator,
  useScannedValueByKey,
  useScannerSelector,
  useScannerDeviceActivator,
  useTranslator,
  useDispatch,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {updateCustomerDeliveryCarrierTracking} from '../../../../features/customerDeliverySlice';

interface CarrierTrackingAlertProps {
  visible?: boolean;
  setVisible: (value: boolean) => void;
  trackingScanKey: string;
  stockMove: any;
}

const CarrierTrackingAlert = ({
  visible = false,
  setVisible,
  trackingScanKey,
  stockMove,
}: CarrierTrackingAlertProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch: any = useDispatch();

  const {isEnabled: scannerEnabled, scanKey} = useScannerSelector();
  const {
    enable: onScanPress,
    isZebraDevice,
    clear: clearScan,
  } = useScanActivator(trackingScanKey);
  const {enable: enableScanner} = useScannerDeviceActivator(trackingScanKey);
  const scannedValue = useScannedValueByKey(trackingScanKey);
  const scanData = useCameraScannerValueByKey(trackingScanKey);

  const defaultValue = useMemo(
    () => stockMove.trackingNumber,
    [stockMove.trackingNumber],
  );

  const [carrierTrackingNumber, setCarrierTrackingNumber] = useState<string>();

  useEffect(() => {
    if (scannedValue) {
      setCarrierTrackingNumber(scannedValue);
      clearScan();
    } else if (scanData?.value != null) {
      setCarrierTrackingNumber(scanData.value);
      setVisible(true);
      clearScan();
    }
  }, [clearScan, scanData, scannedValue, setVisible]);

  useEffect(() => {
    setCarrierTrackingNumber(defaultValue);
  }, [defaultValue]);

  const handleScanPress = useCallback(() => {
    if (!isZebraDevice) setVisible(false);
    onScanPress();
  }, [isZebraDevice, onScanPress, setVisible]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);
  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const handleValidateCarrier = useCallback(() => {
    setVisible(false);
    dispatch(
      (updateCustomerDeliveryCarrierTracking as any)({
        trackingNumber: carrierTrackingNumber,
        version: stockMove.version,
        stockMoveId: stockMove.id,
      }),
    ).then(() => navigation.popToTop());
  }, [
    setVisible,
    dispatch,
    carrierTrackingNumber,
    stockMove.version,
    stockMove.id,
    navigation,
  ]);

  return (
    <Alert
      title={I18n.t('Stock_ScanCarrierTracking')}
      visible={visible}
      cancelButtonConfig={{onPress: () => setVisible(false)}}
      confirmButtonConfig={{
        title: I18n.t('Base_Realize'),
        onPress: handleValidateCarrier,
      }}
      translator={I18n.t}>
      <IconInput
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          styles.content,
        ]}
        value={carrierTrackingNumber}
        onChange={setCarrierTrackingNumber}
        onSelection={enableScanner}
        rightIconsList={[
          <Icon
            style={styles.icon}
            name="arrow-counterclockwise"
            size={20}
            visible={carrierTrackingNumber !== defaultValue}
            touchable
            onPress={() => setCarrierTrackingNumber(defaultValue)}
          />,
          <Icon
            style={styles.icon}
            name="qr-code-scan"
            size={20}
            color={
              scannerEnabled && scanKey === trackingScanKey
                ? Colors.primaryColor.background
                : Colors.secondaryColor_dark.background
            }
            touchable
            onPress={handleScanPress}
          />,
        ]}
        isScannableInput
        isFocus
      />
    </Alert>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
    },
    icon: {
      width: '7%',
      margin: 3,
    },
  });

export default CarrierTrackingAlert;
