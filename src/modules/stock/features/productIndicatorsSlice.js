/*import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { productStockLocation } from '../api/stock-location-api';

export const fetchProductIndicators= createAsyncThunk(
  'product/fetchProductIndicators',
  async function (productId) {
    return productStockLocation(productId).then(response => response.data.data);
  },
);

const initialState = {
  loading: false,
  productIndicators: [],
};

const productIndicators = createSlice({
  name: 'productIndicators',
  initialState,
  extraReducers: builder => {
    builder.addCase(productStockLocation.pending, state => {
      state.loading = true;
    });
    builder.addCase(productStockLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.productIndicators = action.payload;
    });
  },
});

export const productIndicatorsReducer = productIndicators.reducer;*/