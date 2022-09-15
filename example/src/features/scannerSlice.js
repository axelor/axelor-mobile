import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {useMemo} from 'react';

interface ScannerSliceState {
  isEnabled: boolean;
  scanKey: string | null;
  scannedValue: string | null;
}

const scannerSlice = createSlice({
  name: 'scanner',
  initialState: {
    isEnabled: false,
    scanKey: null,
    scannedValue: null,
  },
  reducers: {
    enableScan(state, action) {
      if (state.type === action.payload) {
        state.isEnabled = false;
        state.scanKey = null;
      } else {
        state.isEnabled = true;
        state.scanKey = action.payload;
      }
      state.scannedValue = null;
    },
    scanValue(state, action) {
      state.scannedValue = action.payload;
    },
    disableScan(state) {
      state.isEnabled = false;
      state.scanKey = null;
      state.scannedValue = null;
    },
  },
});

export const {enableScan, scanValue, disableScan} = scannerSlice.actions;

const selectScanner = state => state.scanner;
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
