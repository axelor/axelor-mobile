import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {fetchSaleConfig as _fetchSaleConfig} from '../api/sale-config-api';

export const fetchSaleConfig = createAsyncThunk(
  'sales_saleConfig/fetchSaleConfig',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchSaleConfig,
      data,
      action: 'Sales_SliceAction_FetchSaleConfig',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingSaleConfig: true,
  saleConfig: {},
};

const saleConfigSlice = createSlice({
  name: 'sales_saleConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchSaleConfig.pending, (state, action) => {
      state.loadingSaleConfig = true;
    });
    builder.addCase(fetchSaleConfig.fulfilled, (state, action) => {
      state.loadingSaleConfig = false;
      state.saleConfig = action.payload;
    });
  },
});

export const saleConfigReducer = saleConfigSlice.reducer;
