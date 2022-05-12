import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchStockCorrectionReason} from '@/modules/stock/api/stock-correction-reason-api';

export const fetchStockCorrectionReasons = createAsyncThunk(
  'stockCorrectionReason/fetchStockCorrectionReason',
  async function () {
    return searchStockCorrectionReason().then(response => response.data.data);
  },
);

const initialState = {
  loadingReasons: false,
  stockCorrectionReasonList: [],
};

const stockCorrectionReasonSlice = createSlice({
  name: 'stockCorrectionReason',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockCorrectionReasons.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchStockCorrectionReasons.fulfilled, (state, action) => {
      state.loading = false;
      state.stockCorrectionReasonList = action.payload;
    });
  },
});

export const stockCorrectionReasonReducer = stockCorrectionReasonSlice.reducer;
