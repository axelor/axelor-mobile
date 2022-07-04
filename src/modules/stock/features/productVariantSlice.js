import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchVariants} from '@/modules/stock/api/product-api';
import {handleError} from '@/api/utils';

export const fetchProductVariants = createAsyncThunk(
  'product/fetchProductVariant',
  async function (productVariantId) {
    return fetchVariants(productVariantId)
      .catch(function (error) {
        handleError(error, 'fetch product variants');
      })
      .then(response => {
        return response.data.data;
      });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  productListVariables: [],
};

const productSlice = createSlice({
  name: 'productVariant',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProductVariants.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchProductVariants.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.productListVariables = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.productListVariables = [
            ...state.productListVariables,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const productVariantReducer = productSlice.reducer;
