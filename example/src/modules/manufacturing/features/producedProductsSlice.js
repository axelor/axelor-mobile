import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {fetchManufacturingOrderProducedProducts} from '../api/produced-product-api';

export const fetchProducedProducts = createAsyncThunk(
  'producedProducts/fetchProducedProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrderProducedProducts,
      data,
      action: 'fetch manufacturing order produced products',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  producedProductList: [],
};

const producedProductsSlice = createSlice({
  name: 'producedProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProducedProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProducedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.producedProductList = action.payload?.productList;
    });
  },
});

export const producedProductsReducer = producedProductsSlice.reducer;
