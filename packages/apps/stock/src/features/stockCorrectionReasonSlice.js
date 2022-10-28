import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {searchStockCorrectionReason} from '../api/stock-correction-reason-api';

export const fetchStockCorrectionReasons = createAsyncThunk(
  'stockCorrectionReason/fetchStockCorrectionReason',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchStockCorrectionReason,
      data,
      action: 'fetch stock correction reasons',
      getState,
      responseOptions: {isArrayResponse: true},
    });
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
