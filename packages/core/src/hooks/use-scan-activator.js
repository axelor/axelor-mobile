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

export const useScanActivator = (scanKeySearch, isMass = false) => {
  const dispatch = useDispatch();
  const [isZebraDevice, setIsZebraDevice] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    DeviceInfo.getManufacturer().then(manufacturer => {
      setIsZebraDevice(manufacturer === 'Zebra Technologies');
      setReady(true);
    });
  }, []);

  const enable = useCallback(() => {
    if (!ready) return;

    if (isZebraDevice) {
      dispatch(enableScan(scanKeySearch));
    } else {
      if (isMass) {
        dispatch(enableMassCameraScanner(scanKeySearch));
      } else {
        dispatch(enableCameraScanner(scanKeySearch));
      }
    }
  }, [dispatch, isZebraDevice, isMass, ready, scanKeySearch]);

  return useMemo(
    () => ({
      enable,
      isZebraDevice,
      ready,
    }),
    [enable, isZebraDevice, ready],
  );
};

export const useScannerDeviceActivator = scanKeySearch => {
  const dispatch = useDispatch();

  const enable = useCallback(() => {
    dispatch(enableScan(scanKeySearch));
  }, [dispatch, scanKeySearch]);

  return useMemo(
    () => ({
      enable,
    }),
    [enable],
  );
};

export const useCameraScannerActivator = scanKeySearch => {
  const dispatch = useDispatch();

  const enable = useCallback(() => {
    dispatch(enableCameraScanner(scanKeySearch));
  }, [dispatch, scanKeySearch]);

  return useMemo(
    () => ({
      enable,
    }),
    [enable],
  );
};
