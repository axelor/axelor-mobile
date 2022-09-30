import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {searchStockLocationsFilter} from '@/modules/stock/api/stock-location-api';

export const searchStockLocations = createAsyncThunk(
  'stockLocation/searchStockLocations',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchStockLocationsFilter,
      data,
      action: 'filter stock locations',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const filterSecondStockLocations = createAsyncThunk(
  'stockLocation/filterSecondStockLocations',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchStockLocationsFilter,
      data,
      action: 'filter stock locations',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  stockLocationList: [],
  stockLocationListMultiFilter: [],
};

const stockLocationSlice = createSlice({
  name: 'stockLocation',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchStockLocations.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchStockLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.stockLocationList = action.payload;
    });
    builder.addCase(filterSecondStockLocations.pending, state => {
      state.loading = true;
    });
    builder.addCase(filterSecondStockLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.stockLocationListMultiFilter = action.payload;
    });
  },
});

export const stockLocationReducer = stockLocationSlice.reducer;
