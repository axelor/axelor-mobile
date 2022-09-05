import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  fetchAttachedFiles,
  searchProductsFilter,
  searchProductWithId,
  updateLocker,
} from '@/modules/stock/api/product-api';
import {useHandleError} from '@/api/utils';

export const searchProducts = createAsyncThunk(
  'product/searchProduct',
  async function (data) {
    return searchProductsFilter(data)
      .catch(function (error) {
        useHandleError(error, 'filter products');
      })
      .then(response => response.data.data);
  },
);

export const fetchProductWithId = createAsyncThunk(
  'product/fetchProductWithId',
  async function (productId) {
    return searchProductWithId(productId)
      .catch(function (error) {
        useHandleError(error, 'fetch product from id');
      })
      .then(response => response.data.data[0]);
  },
);

export const updateProductLocker = createAsyncThunk(
  'product/updateLocker',
  async function (data) {
    return updateLocker(data)
      .catch(function (error) {
        useHandleError(error, 'update product locker');
      })
      .then(response => response.data.object);
  },
);

export const fetchProductAttachedFiles = createAsyncThunk(
  'product/fetchAttachedFiles',
  async function (data) {
    return fetchAttachedFiles(data)
      .catch(function (error) {
        useHandleError(error, 'fetch attached files');
      })
      .then(response => response.data.data);
  },
);

const initialState = {
  loadingProduct: false,
  moreLoading: false,
  isListEnd: false,
  productList: [],
  loadingProductFromId: true,
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
