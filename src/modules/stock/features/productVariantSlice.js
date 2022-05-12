import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchProduct} from '@/modules/stock/api/product-variant-api';

export const fetchProductVariants = createAsyncThunk(
  'product/fetchProductVariant',
  async function (productVariantId) {
    return searchProduct(productVariantId).then(response => {
      return response.data.data;
    });
  },
);

const initialState = {
  loading: false,
  productListVariables: [],
};

const productSlice = createSlice({
  name: 'productVariant',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProductVariants.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProductVariants.fulfilled, (state, action) => {
      state.loading = false;
      state.productListVariables = action.payload;
    });
  },
});

export const productVariantReducer = productSlice.reducer;
