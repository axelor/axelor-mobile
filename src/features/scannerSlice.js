import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

interface ScannerSliceState {
  isEnabled: boolean;
  type: string | null;
  value: string | null;
}

const scannerSlice = createSlice({
  name: 'scanner',
  initialState: {
    isEnabled: false,
    type: null,
    value: null,
  },
  reducers: {
    enableScan(state, action) {
      if (state.type === action.payload) {
        state.isEnabled = false;
        state.type = null;
      } else {
        state.isEnabled = true;
        state.type = action.payload;
      }
      state.value = null;
    },
    scanValue(state, action) {
      state.value = action.payload;
    },
    disableScan(state) {
      state.isEnabled = false;
      state.type = null;
      state.value = null;
    },
  },
});

export const {enableScan, scanValue, disableScan} = scannerSlice.actions;

const selectScanner = state => state.scanner;
export const useScannerSelector: () => ScannerSliceState = () =>
  useSelector(selectScanner);

export default scannerSlice.reducer;
