/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {createSlice} from '@reduxjs/toolkit';

interface Barcode {
  value: string;
  type: string;
}

interface CameraScannerSliceState {
  isEnabled: boolean;
  cameraKey: string | null;
  barcode: Barcode | null;
}

const cameraScannerSlice = createSlice({
  name: 'cameraScanner',
  initialState: {
    isEnabled: false,
    cameraKey: null,
    barcode: null,
  },
  reducers: {
    enableCameraScanner(state, action) {
      state.isEnabled = true;
      state.cameraKey = action.payload;
      state.barcode = null;
    },
    scanBarcode(state, action) {
      state.isEnabled = false;
      state.barcode = action.payload;
    },
    disableCameraScanner(state) {
      state.isEnabled = false;
      state.cameraKey = null;
      state.barcode = null;
    },
  },
});

export const {enableCameraScanner, scanBarcode, disableCameraScanner} =
  cameraScannerSlice.actions;

const selectCameraScanner = state => state.cameraScanner;

export const useCameraScannerSelector: () => CameraScannerSliceState = () =>
  useSelector(selectCameraScanner);

export const useCameraScannerValueByKey: (
  key: string,
) => Barcode | null = key => {
  const {cameraKey, barcode} = useCameraScannerSelector();
  return useMemo(
    () => (key === cameraKey ? barcode : null),
    [cameraKey, key, barcode],
  );
};

export default cameraScannerSlice.reducer;
