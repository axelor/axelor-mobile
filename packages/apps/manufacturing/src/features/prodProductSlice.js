import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {
  createProdProduct,
  fetchManufacturingOrderConsumedProducts,
  fetchManufacturingOrderProducedProducts,
  updateProdProduct,
} from '../api/prod-product-api';

const TYPE_CONSUMED = 'consumed';
const TYPE_PRODUCED = 'produced';

export const fetchConsumedProducts = createAsyncThunk(
  'prodProducts/fetchConsumedProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrderConsumedProducts,
      data,
      action: 'fetch manufacturing order consumed products',
      getState,
      responseOptions: {},
    });
  },
);

export const fetchProducedProducts = createAsyncThunk(
  'prodProducts/fetchProducedProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrderProducedProducts,
      data,
      action: 'fetch manufacturing order produced products',
      getState,
      responseOptions: {},
    });
  },
);

export const addProdProductToManufOrder = createAsyncThunk(
  'prodProducts/addProdProductToManufOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createProdProduct,
      data,
      action: 'create new prodProduct on manufacturing order',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const updateProdProductOfManufOrder = createAsyncThunk(
  'prodProducts/updateProdProductOfManufOrder',
  async function (data, {getState}) {
    const type = data?.type;
    return handlerApiCall({
      fetchFunction: updateProdProduct,
      data,
      action: 'update prodProduct qty on manufacturing order',
      getState,
      responseOptions: {showToast: true},
    }).then(() => {
      if (type === TYPE_CONSUMED) {
        return handlerApiCall({
          fetchFunction: fetchManufacturingOrderConsumedProducts,
          data,
          action: 'fetch manufacturing order consumed products',
          getState,
          responseOptions: {},
        });
      } else if (type === TYPE_PRODUCED) {
        return handlerApiCall({
          fetchFunction: fetchManufacturingOrderProducedProducts,
          data,
          action: 'fetch manufacturing order produced products',
          getState,
          responseOptions: {},
        });
      }
    });
  },
);

const initialState = {
  loadingConsumedProducts: false,
  consumedProductList: [],
  loadingProducedProducts: false,
  producedProductList: [],
};

const prodProductsSlice = createSlice({
  name: 'prodProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchConsumedProducts.pending, state => {
      state.loadingConsumedProducts = true;
    });
    builder.addCase(fetchConsumedProducts.fulfilled, (state, action) => {
      state.loadingConsumedProducts = false;
      state.consumedProductList = action.payload?.productList;
    });
    builder.addCase(fetchProducedProducts.pending, state => {
      state.loadingProducedProducts = true;
    });
    builder.addCase(fetchProducedProducts.fulfilled, (state, action) => {
      state.loadingProducedProducts = false;
      state.producedProductList = action.payload?.productList;
    });
    builder.addCase(
      updateProdProductOfManufOrder.fulfilled,
      (state, action) => {
        if (action.meta.arg.type === TYPE_CONSUMED) {
          state.consumedProductList = action.payload?.productList;
        } else if (action.meta.arg.type === TYPE_PRODUCED) {
          state.producedProductList = action.payload?.productList;
        }
      },
    );
  },
});

export const prodProductsReducer = prodProductsSlice.reducer;
