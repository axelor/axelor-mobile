import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  fetchVariantAttributes,
  fetchVariants,
} from '@/modules/stock/api/product-api';
import {useHandleError} from '@/api/utils';

export const fetchProductVariants = createAsyncThunk(
  'product/fetchProductVariant',
  async function (productVariantId) {
    return fetchVariants(productVariantId)
      .catch(function (error) {
        useHandleError(error, 'fetch product variants');
      })
      .then(response => {
        return response.data.data;
      });
  },
);

var getProductAvailabilty = async data => {
  return fetchVariantAttributes(data)
    .catch(function (error) {
      useHandleError(error, 'fetch product variants attributes');
    })
    .then(response => {
      return response.data.object;
    });
};

async function fetchData(data) {
  return await getProductAvailabilty(data);
}

export const fetchProductsAttributes = createAsyncThunk(
  'product/fetchProductsAttributes',
  async function (data) {
    let promises = [];
    data.productList.forEach(product => {
      promises.push(
        fetchData({productVariantId: product.id, version: product.version}),
      );
    });
    return Promise.all(promises);
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  productListVariables: [],
  listProductsAttributes: [],
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
    builder.addCase(fetchProductsAttributes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAttributes.fulfilled, (state, action) => {
      state.loading = false;
      state.listProductsAttributes = action.payload;
    });
  },
});

export const productVariantReducer = productSlice.reducer;
