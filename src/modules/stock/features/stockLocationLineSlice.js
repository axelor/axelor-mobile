import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchStockLocationLine} from '../api/stock-location-line-api';

export const fetchStockLocationLine = createAsyncThunk(
  'stockLocationLine/fetchStockLocationLines',
  async function (data) {
    console.log('---------------------');
    console.log(data.stockId);
    return searchStockLocationLine(data).then(response => {
      console.log(response.data.data);
      return response.data.data;
    });
  },
);

const initialState = {
  loading: false,
  stockLocationLine: [],
};

const stockLocationLineSlice = createSlice({
  name: 'stockLocationLine',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockLocationLine.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchStockLocationLine.fulfilled, (state, action) => {
      state.loading = false;
      state.stockLocationLine = action.payload;
    });
  },
});

export const stockLocationLineReducer = stockLocationLineSlice.reducer;
