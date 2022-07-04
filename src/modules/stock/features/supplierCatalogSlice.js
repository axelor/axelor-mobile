import {handleError} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchSupplierProduct} from '../api/supplier-catalog-api';

export const fetchProductForSupplier = createAsyncThunk(
  'supplierCatalog/fetchProductForSupplier',
  async function (data) {
    return searchSupplierProduct(data)
      .catch(function (error) {
        handleError(error, 'fetch supplier catalog product informations');
      })
      .then(response => {
        if (response.data.data == null) {
          return null;
        } else {
          return response.data.data[0];
        }
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
