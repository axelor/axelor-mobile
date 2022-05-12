import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchStockLocation} from '@/modules/stock/api/stock-location-api';

export const fetchStockLocations = createAsyncThunk(
  'stockLocation/fetchStockLocation',
  async function () {
    return searchStockLocation().then(response => response.data.data);
  },
);

const initialState = {
  loading: false,
  stockLocationList: [],
};

const stockLocationSlice = createSlice({
  name: 'stockLocation',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockLocations.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchStockLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.stockLocationList = action.payload;
    });
  },
});

export const stockLocationReducer = stockLocationSlice.reducer;
