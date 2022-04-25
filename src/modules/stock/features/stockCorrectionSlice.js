import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchStockCorrection} from '@/modules/stock/api/stock-correction-api';

export const fetchStockCorrections = createAsyncThunk(
  'stockCorrection/fetchStockCorrection',
  async function () {
    return searchStockCorrection().then(response => response.data.data);
  },
);

const initialState = {
  loading: false,
  stockCorrectionList: [],
};

const stockCorrectionSlice = createSlice({
  name: 'stockCorrection',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockCorrections.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchStockCorrections.fulfilled, (state, action) => {
      state.loading = false;
      state.stockCorrectionList = action.payload;
    });
  },
});

export const stockCorrectionReducer = stockCorrectionSlice.reducer;
