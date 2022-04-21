import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchProduct} from '@/modules/stock/api/product-api';

export const fetchProducts = createAsyncThunk(
  'product/fetchProduct',
  async function () {
    return searchProduct().then(response => response.data.data);
  },
);

const initialState = {
  loading: false,
  productList: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.productList = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
