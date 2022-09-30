import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {
  searchStockCorrection,
  createStockCorrection,
  updateStockCorrection,
} from '@/modules/stock/api/stock-correction-api';

export const fetchStockCorrections = createAsyncThunk(
  'stockCorrection/fetchStockCorrection',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchStockCorrection,
      data,
      action: 'fetch stock corrections',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const createCorrection = createAsyncThunk(
  'stockCorrection/createStockCorrection',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createStockCorrection,
      data,
      action: 'create stock correction',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const updateCorrection = createAsyncThunk(
  'stockCorrection/updateStockCorrection',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateStockCorrection,
      data,
      action: 'update stock correction',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loadingStockCorrection: true,
  moreLoading: false,
  isListEnd: false,
  stockCorrectionList: [],
  createResponse: {},
  updateResponse: {},
};

const stockCorrectionSlice = createSlice({
  name: 'stockCorrection',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockCorrections.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingStockCorrection = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchStockCorrections.fulfilled, (state, action) => {
      state.loadingStockCorrection = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.stockCorrectionList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.stockCorrectionList = [
            ...state.stockCorrectionList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(createCorrection.pending, state => {
      state.loadingStockCorrection = true;
    });
    builder.addCase(createCorrection.fulfilled, (state, action) => {
      state.loadingStockCorrection = false;
      state.createResponse = action.payload;
    });
    builder.addCase(updateCorrection.pending, state => {
      state.loadingStockCorrection = true;
    });
    builder.addCase(updateCorrection.fulfilled, (state, action) => {
      state.loadingStockCorrection = false;
      state.updateResponse = action.payload;
    });
  },
});

export const stockCorrectionReducer = stockCorrectionSlice.reducer;
