import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {searchSupplierProduct} from '../api/supplier-catalog-api';

export const fetchProductForSupplier = createAsyncThunk(
  'supplierCatalog/fetchProductForSupplier',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchSupplierProduct,
      data,
      action: 'fetch supplier catalog product informations',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingSupplierCatalog: false,
  supplierProductInfo: {},
};

const supplierCatalogSlice = createSlice({
  name: 'supplierCatalog',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProductForSupplier.pending, state => {
      state.loadingSupplierCatalog = true;
    });
    builder.addCase(fetchProductForSupplier.fulfilled, (state, action) => {
      state.loadingSupplierCatalog = false;
      state.supplierProductInfo = action.payload;
    });
  },
});

export const supplierCatalogReducer = supplierCatalogSlice.reducer;
