import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchStockCorrectionReason} from '@/modules/stock/api/stock-correction-reason-api';
import {handlerApiCall} from '@/api/utils';

export const fetchStockCorrectionReasons = createAsyncThunk(
  'stockCorrectionReason/fetchStockCorrectionReason',
  async function (data = {}, {getState}) {
    return handlerApiCall(
      {fetchFunction: searchStockCorrectionReason},
      data,
      'fetch stock correction reasons',
      {getState},
      {array: true},
    );
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
