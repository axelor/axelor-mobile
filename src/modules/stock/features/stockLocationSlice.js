import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchStockLocationsFilter} from '@/modules/stock/api/stock-location-api';
import {useHandleError} from '@/api/utils';

export const searchStockLocations = createAsyncThunk(
  'stockLocation/searchStockLocations',
  async function (data) {
    return searchStockLocationsFilter(data)
      .catch(function (error) {
        useHandleError(error, 'filter stock locations');
      })
      .then(response => response.data.data);
  },
);

export const filterSecondStockLocations = createAsyncThunk(
  'stockLocation/filterSecondStockLocations',
  async function (data) {
    return searchStockLocationsFilter(data)
      .catch(function (error) {
        useHandleError(error, 'filter stock locations');
      })
      .then(response => response.data.data);
  },
);

const initialState = {
  loading: false,
  stockLocationList: [],
  stockLocationListMultiFilter: [],
};

const stockLocationSlice = createSlice({
  name: 'stockLocation',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchStockLocations.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchStockLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.stockLocationList = action.payload;
    });
    builder.addCase(filterSecondStockLocations.pending, state => {
      state.loading = true;
    });
    builder.addCase(filterSecondStockLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.stockLocationListMultiFilter = action.payload;
    });
  },
});

export const stockLocationReducer = stockLocationSlice.reducer;
