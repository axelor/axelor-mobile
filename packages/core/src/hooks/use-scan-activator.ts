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

import {useCallback, useEffect, useMemo, useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {
  enableCameraScanner,
  enableMassCameraScanner,
} from '../features/cameraScannerSlice';
import {enableScan} from '../features/scannerSlice';
import {useDispatch} from '../redux/hooks';

export const useScanActivator = (
  scanKeySearch: string,
  isMassScan: boolean = false,
) => {
  const {enable: enableScanner} = useScannerDeviceActivator(scanKeySearch);
  const {enable: enableCamera, enableMassCamera} =
    useCameraScannerActivator(scanKeySearch);

  const [isZebraDevice, setIsZebraDevice] = useState(false);

  useEffect(() => {
    DeviceInfo.getManufacturer().then(manufacturer =>
      setIsZebraDevice(manufacturer === 'Zebra Technologies'),
    );
  }, []);

  const enable = useCallback(() => {
    if (isZebraDevice) {
      enableScanner();
    } else if (isMassScan) {
      enableMassCamera();
    } else {
      enableCamera();
    }
  }, [
    isZebraDevice,
    enableScanner,
    isMassScan,
    enableMassCamera,
    enableCamera,
  ]);

  return useMemo(() => ({enable, isZebraDevice}), [enable, isZebraDevice]);
};

export const useScannerDeviceActivator = (scanKeySearch: string) => {
  const dispatch = useDispatch();

  const enable = useCallback(() => {
    dispatch(enableScan(scanKeySearch));
  }, [dispatch, scanKeySearch]);

  return useMemo(() => ({enable}), [enable]);
};

export const useCameraScannerActivator = (scanKeySearch: string) => {
  const dispatch = useDispatch();

  const enableCamera = useCallback(() => {
    dispatch(enableCameraScanner(scanKeySearch));
  }, [dispatch, scanKeySearch]);

  const enableMassCamera = useCallback(() => {
    dispatch(enableMassCameraScanner(scanKeySearch));
  }, [dispatch, scanKeySearch]);

  return useMemo(
    () => ({enable: enableCamera, enableMassCamera}),
    [enableCamera, enableMassCamera],
  );
};
