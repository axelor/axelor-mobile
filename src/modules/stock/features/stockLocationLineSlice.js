import {handlerApiCall} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchStockLocationLine} from '../api/stock-location-line-api';

export const fetchStockLocationLine = createAsyncThunk(
  'stockLocationLine/fetchStockLocationLines',
  async function (data, {getState}) {
    return handlerApiCall(
      {fetchFunction: searchStockLocationLine},
      data,
      'fetch stock location line',
      {getState},
      {array: true},
    );
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  stockLocationLine: [],
};

const stockLocationLineSlice = createSlice({
  name: 'stockLocationLine',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockLocationLine.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchStockLocationLine.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.stockLocationLine = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.stockLocationLine = [
            ...state.stockLocationLine,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const stockLocationLineReducer = stockLocationLineSlice.reducer;
