import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {
  useCameraScannerValueByKey,
  clearBarcode,
  enableMassCameraScanner,
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
  const {enable: enableScan} = useScanActivator(scanKey);
  const {isEnabled} = useCameraScannerSelector();

  const isProcessingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isZebraDevice, setIsZebraDevice] = useState(false);

  useEffect(() => {
    if (!isEnabled && enabled && !isZebraDevice) {
      onClose?.();
    }
  }, [enabled, isEnabled, onClose, isZebraDevice]);

  useEffect(() => {
    if (!enabled) return;

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
  }, [dispatch, enableScan, scanKey, enabled]);

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
