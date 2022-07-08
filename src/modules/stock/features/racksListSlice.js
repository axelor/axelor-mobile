import {useHandleError} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchStockLocationLine} from '../api/stock-location-line-api';

export const getRacks = createAsyncThunk('Utils/racks', async function (data) {
  let promises = [];
  data.LineList.forEach(line => {
    promises.push(fetchData(data.stockId, line));
  });
  return Promise.all(promises).then(resultes => {
    return resultes;
  });
});

var getRack = async (stockId, productId) => {
  return searchStockLocationLine({
    stockId: stockId,
    productId: productId,
  })
    .catch(function (error) {
      useHandleError(error, 'fetch rack');
    })
    .then(response => {
      return response.data.data;
    });
};

async function fetchData(stockId, line) {
  return await getRack(stockId, line.product.id);
}

const initialState = {
  loadingRacks: false,
  racksList: [],
};

const rackSlice = createSlice({
  name: 'rack',
  initialState,
  extraReducers: builder => {
    builder.addCase(getRacks.pending, state => {
      state.loadingRacks = true;
    });
    builder.addCase(getRacks.fulfilled, (state, action) => {
      state.loadingRacks = false;
      state.racksList = action.payload;
    });
  },
});

export const rackReducer = rackSlice.reducer;
