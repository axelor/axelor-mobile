import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {
  fetchAttachedFiles,
  searchProductsFilter,
  searchProductWithId,
  updateLocker,
} from '@/modules/stock/api/product-api';

export const searchProducts = createAsyncThunk(
  'product/searchProduct',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProductsFilter,
      data,
      action: 'filter products',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchProductWithId = createAsyncThunk(
  'product/fetchProductWithId',
  async function (productId, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProductWithId,
      data: productId,
      action: 'fetch product from id',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateProductLocker = createAsyncThunk(
  'product/updateLocker',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateLocker,
      data,
      action: 'update product locker',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const fetchProductAttachedFiles = createAsyncThunk(
  'product/fetchAttachedFiles',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchAttachedFiles,
      data,
      action: 'fetch attached files',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingProduct: false,
  moreLoading: false,
  isListEnd: false,
  productList: [],
  loadingProductFromId: false,
  productFromId: {},
  updateResponde: {},
  filesList: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchProducts.pending, (state, action) => {
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.loadingProduct = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.loadingProduct = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.productList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.productList = [...state.productList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchProductWithId.pending, state => {
      state.loadingProduct = true;
      state.loadingProductFromId = true;
    });
    builder.addCase(fetchProductWithId.fulfilled, (state, action) => {
      state.loadingProduct = false;
      state.loadingProductFromId = false;
      state.productFromId = action.payload;
    });
    builder.addCase(updateProductLocker.pending, state => {
      state.loadingProduct = true;
    });
    builder.addCase(updateProductLocker.fulfilled, (state, action) => {
      state.loadingProduct = false;
      state.updateResponde = action.payload;
    });
    builder.addCase(fetchProductAttachedFiles.pending, state => {
      state.loadingProduct = true;
    });
    builder.addCase(fetchProductAttachedFiles.fulfilled, (state, action) => {
      state.loadingProduct = false;
      state.filesList = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
