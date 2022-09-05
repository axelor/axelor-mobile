import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchTrackingNumberFilter} from '@/modules/stock/api/tracking-number-api';
import {handlerApiCall} from '@/api/utils';

export const filterTrackingNumber = createAsyncThunk(
  'trackingNumber/filterTrackingNumber',
  async function (data, {getState}) {
    return handlerApiCall(
      {fetchFunction: searchTrackingNumberFilter},
      data,
      'filter product tracking numbers',
      {getState},
      {array: true},
    );
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
