import {handlerApiCall} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchStockLocationLine} from '../api/stock-location-line-api';

export const getRacks = createAsyncThunk(
  'Utils/racks',
  async function (data, {getState}) {
    let promises = [];
    data.LineList.forEach(line => {
      promises.push(fetchData(data.stockId, line, {getState}));
    });
    return Promise.all(promises).then(resultes => {
      return resultes;
    });
  },
);

var getRack = async (stockId, productId, {getState}) => {
  return handlerApiCall(
    {fetchFunction: searchStockLocationLine},
    {
      stockId: stockId,
      productId: productId,
    },
    'fetch rack',
    {getState},
    {array: true},
  );
};

async function fetchData(stockId, line, {getState}) {
  return await getRack(stockId, line.product.id, {getState});
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
