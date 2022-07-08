import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  searchTrackingNumber,
  searchTrackingNumberFilter,
} from '@/modules/stock/api/tracking-number-api';
import {useHandleError} from '@/api/utils';

export const fetchTrackingNumber = createAsyncThunk(
  'trackingNumber/fetchTrackingNumber',
  async function (productId) {
    return searchTrackingNumber(productId)
      .catch(function (error) {
        useHandleError(error, 'fetch product tracking numbers');
      })
      .then(response => response.data.data);
  },
);

export const filterTrackingNumber = createAsyncThunk(
  'trackingNumber/filterTrackingNumber',
  async function (data) {
    return searchTrackingNumberFilter(data)
      .catch(function (error) {
        useHandleError(error, 'filter tracking numbers');
      })
      .then(response => response.data.data);
  },
);

const initialState = {
  loading: false,
  trackingNumberList: [],
};

const trackingNumberSlice = createSlice({
  name: 'trackingNumber',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchTrackingNumber.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchTrackingNumber.fulfilled, (state, action) => {
      state.loading = false;
      state.trackingNumberList = action.payload;
    });
    builder.addCase(filterTrackingNumber.pending, state => {
      state.loading = true;
    });
    builder.addCase(filterTrackingNumber.fulfilled, (state, action) => {
      state.loading = false;
      state.trackingNumberList = action.payload;
    });
  },
});

export const trackingNumberReducer = trackingNumberSlice.reducer;
