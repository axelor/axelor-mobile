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
import {enableCameraScanner} from '../features/cameraScannerSlice';
import {enableScan} from '../features/scannerSlice';
import {useDispatch} from '../redux/hooks';

export const useScanActivator = scanKeySearch => {
  const {enable: enableScanner} = useScannerDeviceActivator(scanKeySearch);
  const {enable: enableCamera} = useCameraScannerActivator(scanKeySearch);

  const [isZebraDevice, setDeviceType] = useState(false);

  useEffect(() => {
    DeviceInfo.getManufacturer().then(manufacturer =>
      setDeviceType(manufacturer === 'Zebra Technologies'),
    );
  }, []);

  const enable = useCallback(() => {
    if (isZebraDevice) {
      enableScanner(scanKeySearch);
    } else {
      enableCamera(scanKeySearch);
    }
  }, [enableCamera, enableScanner, isZebraDevice, scanKeySearch]);

  return useMemo(
    () => ({
      enable,
    }),
    [enable],
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
