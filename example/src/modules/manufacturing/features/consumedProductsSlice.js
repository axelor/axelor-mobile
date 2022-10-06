import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {fetchManufacturingOrderConsumedProducts} from '../api/consumed-product-api';

export const fetchConsumedProducts = createAsyncThunk(
  'consumedProducts/fetchConsumedProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrderConsumedProducts,
      data,
      action: 'fetch manufacturing order consumed products',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loading: false,
  consumedProductList: [],
};

const consumedProductsSlice = createSlice({
  name: 'consumedProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchConsumedProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchConsumedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.consumedProductList = action.payload?.productList;
    });
  },
});

export const consumedProductsReducer = consumedProductsSlice.reducer;
