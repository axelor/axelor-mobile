import {handleError} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getProductStockIndicators} from '../api/product-api';

export const fetchProductIndicators = createAsyncThunk(
  'product/fetchProductIndicators',
  async function (data) {
    return getProductStockIndicators(data)
      .catch(function (error) {
        handleError(error, 'fetch proudct stock indicators');
      })
      .then(response => response.data.object);
  },
);

const initialState = {
  loading: true,
  productIndicators: {},
};

const productIndicators = createSlice({
  name: 'productIndicators',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProductIndicators.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProductIndicators.fulfilled, (state, action) => {
      state.loading = false;
      state.productIndicators = action.payload;
    });
  },
});

export const productIndicatorsReducer = productIndicators.reducer;
