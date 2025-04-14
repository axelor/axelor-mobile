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

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  useCameraScannerValueByKey,
  clearBarcode,
  enableMassCameraScanner,
  disableCameraScanner,
} from '../../../features/cameraScannerSlice';
import {useScanActivator} from '../../../hooks/use-scan-activator';
import DeviceInfo from 'react-native-device-info';
import {clearScan, useScannedValueByKey} from '../../../features/scannerSlice';
import {useCameraScannerSelector} from '../../../features/cameraScannerSlice';

interface MassScannerProps {
  scanKey: string;
  backgroundAction: (scannedValue: string) => any;
  fallbackAction?: (error: any) => void;
  scanInterval?: number;
  onClose?: () => void;
}

const MassScanner = ({
  scanKey,
  backgroundAction,
  fallbackAction,
  scanInterval = 1000,
  onClose,
}: MassScannerProps) => {
  const dispatch = useDispatch();
  const scannedBarcode = useCameraScannerValueByKey(scanKey);
  const {enable: enableScan} = useScanActivator(scanKey);
  const scannedValue = useScannedValueByKey(scanKey);
  const {isEnabled} = useCameraScannerSelector();

  const isProcessingRef = useRef(false);
  const timerRef = useRef(null);
  const hasMounted = useRef(false);

  const [isZebraDevice, setIsZebraDevice] = useState(false);

  useEffect(() => {
    if (hasMounted.current && !isEnabled) {
      onClose?.();
    }
  }, [isEnabled, onClose]);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    DeviceInfo.getManufacturer().then(manufacturer => {
      const isZebra = manufacturer === 'Zebra Technologies';
      setIsZebraDevice(isZebra);

      if (isZebra) {
        enableScan();
      } else {
        dispatch(enableMassCameraScanner(scanKey));
      }
    });

    return () => {
      dispatch(disableCameraScanner());
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dispatch, enableScan, scanKey]);

  const processScan = useCallback(
    async (value: string, clearAction: () => void) => {
      console.log('value', value);
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      try {
        await backgroundAction(value);
      } catch (error) {
        dispatch(disableCameraScanner());
        fallbackAction?.(error);
        return;
      } finally {
        clearAction();
        timerRef.current = setTimeout(() => {
          isProcessingRef.current = false;

          if (isZebraDevice) {
            enableScan();
          }
        }, scanInterval);
      }
    },
    [
      backgroundAction,
      dispatch,
      enableScan,
      fallbackAction,
      isZebraDevice,
      scanInterval,
    ],
  );

  useEffect(() => {
    if (scannedValue) {
      processScan(scannedValue, () => dispatch(clearScan()));
    }
  }, [dispatch, processScan, scannedValue]);

  useEffect(() => {
    if (scannedBarcode?.value) {
      processScan(scannedBarcode.value, () => dispatch(clearBarcode()));
    }
  }, [dispatch, processScan, scannedBarcode]);

  return (
    <View>
      <ActivityIndicator size="large" />
      <Text>Mass scanning in progress...</Text>
    </View>
  );
};

export default MassScanner;
