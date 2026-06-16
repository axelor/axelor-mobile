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

import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {createSlice} from '@reduxjs/toolkit';

interface ScannerSliceState {
  isEnabled: boolean;
  scanKey: string | null;
  scannedValue: string | null;
  isMassScan: boolean;
}

const scannerSlice = createSlice({
  name: 'scanner',
  initialState: {
    isEnabled: false,
    scanKey: null,
    scannedValue: null,
    isMassScan: false,
  },
  reducers: {
    enableScan(state, action) {
      const {scanKey, isMassScan} =
        typeof action.payload === 'string'
          ? {scanKey: action.payload, isMassScan: false}
          : action.payload;

      state.isEnabled = true;
      state.scanKey = scanKey;
      state.scannedValue = null;
      state.isMassScan = isMassScan ?? false;
    },
    scanValue(state, action) {
      state.scannedValue = action.payload;
    },
    disableScan(state) {
      state.isEnabled = false;
      state.scanKey = null;
      state.scannedValue = null;
      state.isMassScan = false;
    },
    clearScan(state) {
      state.scannedValue = null;
    },
  },
});

export const {enableScan, scanValue, disableScan, clearScan} =
  scannerSlice.actions;

const selectScanner = (state: any) => state.scanner;

export const useScannerSelector: () => ScannerSliceState = () =>
  useSelector(selectScanner);

export const useScannedValueByKey: (key: string) => string | null = key => {
  const {scanKey, scannedValue} = useScannerSelector();
  return useMemo(
    () => (key === scanKey ? scannedValue : null),
    [scanKey, key, scannedValue],
  );
};

export default scannerSlice.reducer;
