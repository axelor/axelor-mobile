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

import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useDispatch} from '../redux/hooks';
import {
  useCameraScannerValueByKey,
  clearBarcode,
} from '../features/cameraScannerSlice';
import {
  clearScan,
  useScannedValueByKey,
  useScannerSelector,
} from '../features/scannerSlice';
import {useScanActivator} from './use-scan-activator';

interface UseMassScannerParams {
  scanKey: string;
  backgroundAction: (
    scannedValue: string,
    tools?: {disableScan: () => void},
  ) => any;
  fallbackAction?: (error: any) => void;
  scanInterval?: number;
  disableOnError?: boolean;
}

export const useMassScanner = ({
  scanKey,
  backgroundAction,
  fallbackAction,
  scanInterval = 1000,
  disableOnError = true,
}: UseMassScannerParams) => {
  const isProcessingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatch = useDispatch();

  const {isEnabled: isScanEnabled, scanKey: activeScanKey} =
    useScannerSelector();
  const {
    enable: enableScan,
    disable: disableScan,
    isZebraDevice,
  } = useScanActivator(scanKey, true);
  const scannedBarcode = useCameraScannerValueByKey(scanKey);
  const scannedValue = useScannedValueByKey(scanKey);

  const isEnabled = useMemo(
    () => isScanEnabled && activeScanKey === scanKey,
    [activeScanKey, isScanEnabled, scanKey],
  );

  const processScan = useCallback(
    async (value: string, clearAction: () => void) => {
      if (isProcessingRef.current) return;

      try {
        isProcessingRef.current = true;
        await backgroundAction(value, {disableScan});
      } catch (error) {
        if (disableOnError) disableScan();
        setTimeout(() => fallbackAction?.(error), 50);
      } finally {
        timerRef.current = setTimeout(
          () => {
            isProcessingRef.current = false;
            clearAction();
          },
          isZebraDevice ? 0 : scanInterval,
        );
      }
    },
    [
      backgroundAction,
      disableOnError,
      disableScan,
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
  }, [dispatch, processScan, scannedBarcode?.value]);

  return useMemo(
    () => ({disableScan, enableScan, isEnabled}),
    [disableScan, enableScan, isEnabled],
  );
};
