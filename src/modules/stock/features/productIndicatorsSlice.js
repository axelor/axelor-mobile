import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { productStockLocation } from '../api/stock-location-api';

export const fetchProductIndicators= createAsyncThunk(
  'product/fetchProductIndicators',
  async function (productId) {
      console.log("on est dans la fonction");
    return productStockLocation(productId).then(response => {console.log(response);return response.data.object});
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
    builder.addCase(fetchProductIndicators.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProductIndicators.fulfilled, (state, action) => {
      state.loading = false;
      state.productIndicators = action.payload;
    });
  },
});

export const productIndicatorsReducer = productIndicators.reducer;