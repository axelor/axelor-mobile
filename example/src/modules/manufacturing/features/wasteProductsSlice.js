import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {fetchManufacturingOrderWasteProducts} from '../api/waste-product-api';

export const fetchWasteProducts = createAsyncThunk(
  'wasteProducts/fetchWasteProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrderWasteProducts,
      data,
      action: 'fetch manufacturing order waste products',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  wasteProductList: [],
};

const wasteProductsSlice = createSlice({
  name: 'wasteProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchWasteProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchWasteProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.wasteProductList = action.payload;
    });
  },
});

export const wasteProductsReducer = wasteProductsSlice.reducer;
