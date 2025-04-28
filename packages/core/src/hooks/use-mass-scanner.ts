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

import {useCallback, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {
  useCameraScannerValueByKey,
  clearBarcode,
  disableCameraScanner,
  useCameraScannerSelector,
} from '../features/cameraScannerSlice';
import {clearScan, useScannedValueByKey} from '../features/scannerSlice';
import {useScanActivator} from './use-scan-activator';

interface UseMassScannerParams {
  scanKey: string;
  backgroundAction: (scannedValue: string) => any;
  fallbackAction?: (error: any) => void;
  scanInterval?: number;
  onClose?: () => void;
  enabled?: boolean;
}

export const useMassScanner = ({
  scanKey,
  backgroundAction,
  fallbackAction,
  scanInterval = 1000,
  onClose,
  enabled = false,
}: UseMassScannerParams) => {
  const dispatch = useDispatch();
  const scannedBarcode = useCameraScannerValueByKey(scanKey);
  const scannedValue = useScannedValueByKey(scanKey);
  const {
    enable: enableScan,
    isZebraDevice,
    ready,
  } = useScanActivator(scanKey, true);
  const {isEnabled} = useCameraScannerSelector();

  const isProcessingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled || !ready) return;

    if (!isEnabled && !isZebraDevice) {
      onClose?.();
    }
  }, [enabled, isEnabled, onClose, isZebraDevice, ready]);

  useEffect(() => {
    if (!enabled || !ready) return;

    enableScan();
  }, [enabled, enableScan, ready]);

  useEffect(() => {
    if (!enabled || !ready) return;

    if (!isEnabled && !isZebraDevice) {
      onClose?.();
    }
  }, [isEnabled, enabled, ready, isZebraDevice, onClose]);

  const processScan = useCallback(
    async (value: string, clearAction: () => void) => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      const delay = isZebraDevice ? 0 : scanInterval;

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
          if (isZebraDevice) enableScan();
        }, delay);
      }
    },
    [
      backgroundAction,
      fallbackAction,
      dispatch,
      enableScan,
      isZebraDevice,
      scanInterval,
    ],
  );

  useEffect(() => {
    if (scannedValue) {
      processScan(scannedValue, () => dispatch(clearScan()));
    }
  }, [scannedValue, processScan, dispatch]);

  useEffect(() => {
    if (scannedBarcode?.value) {
      processScan(scannedBarcode.value, () => dispatch(clearBarcode()));
    }
  }, [scannedBarcode, processScan, dispatch]);
};
