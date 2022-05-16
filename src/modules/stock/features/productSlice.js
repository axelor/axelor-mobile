import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  searchProduct,
  searchProductWithId,
  updateLocker,
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

export const updateProductLocker = createAsyncThunk(
  'product/updateLocker',
  async function (data) {
    return updateLocker(data)
      .catch(function (error) {
        if (error.response) {
          console.log('Error got caugth: ');
          console.log(error.response.data);
        }
      })
      .then(response => response.data.object);
  },
);

const initialState = {
  loadingProduct: false,
  productList: [],
  productFromId: {},
  updateResponde: {},
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
    builder.addCase(updateProductLocker.pending, state => {
      state.loadingProduct = true;
    });
    builder.addCase(updateProductLocker.fulfilled, (state, action) => {
      state.loadingProduct = false;
      state.updateResponde = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
