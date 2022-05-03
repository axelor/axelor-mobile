import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchTrackingNumber} from '@/modules/stock/api/tracking-number-api';

export const fetchTrackingNumber = createAsyncThunk(
  'trackingNumber/fetchTrackingNumber',
  async function (productId) {
    return searchTrackingNumber(productId).then(response => response.data.data);
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
  },
});

export const trackingNumberReducer = trackingNumberSlice.reducer;
