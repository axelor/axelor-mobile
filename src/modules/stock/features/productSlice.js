import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  searchProduct,
  searchProductWithId,
} from '@/modules/stock/api/product-api';

export const fetchProducts = createAsyncThunk(
  'product/fetchProduct',
  async function () {
    return searchProduct().then(response => response.data.data);
  },
);

export const fetchProductWithId = createAsyncThunk(
  'product/fetchProductWithId',
  async function (productId) {
    return searchProductWithId(productId).then(
      response => response.data.data[0],
    );
  },
);

const initialState = {
  loadingProduct: true,
  productList: [],
  productFromId: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.loadingProduct = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loadingProduct = false;
      state.productList = action.payload;
    });
    builder.addCase(fetchProductWithId.pending, state => {
      state.loadingProduct = true;
    });
    builder.addCase(fetchProductWithId.fulfilled, (state, action) => {
      state.loadingProduct = false;
      state.productFromId = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
