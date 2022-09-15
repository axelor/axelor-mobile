import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  addLineStockMove,
  realizeSockMove,
  searchDeliveryFilter,
} from '@/modules/stock/api/customer-delivery-api';
import {handlerApiCall} from '@/api/utils';

export const searchDeliveries = createAsyncThunk(
  'deliveries/searchDeliveries',
  async function (data, {getState}) {
    return handlerApiCall(
      {fetchFunction: searchDeliveryFilter},
      data,
      'filter customer deliveries',
      {getState},
      {array: true},
    );
  },
);

export const addNewLine = createAsyncThunk(
  'deliveries/addNewLine',
  async function (data, {getState}) {
    return handlerApiCall(
      {fetchFunction: addLineStockMove},
      data,
      'add new line to customer delivery',
      {getState},
      {showToast: true},
    );
  },
);

export const realizeCustomerDelivery = createAsyncThunk(
  'deliveries/realizeCustomerDelivery',
  async function (data, {getState}) {
    return handlerApiCall(
      {fetchFunction: realizeSockMove},
      data,
      'realize customer delivery',
      {getState},
      {showToast: true},
    );
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  deliveryList: [],
  newLineResponse: {},
  realizeResponse: {},
};

const customerDeliverySlice = createSlice({
  name: 'deliveries',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchDeliveries.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(searchDeliveries.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.deliveryList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.deliveryList = [...state.deliveryList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(addNewLine.pending, state => {
      state.loading = true;
    });
    builder.addCase(addNewLine.fulfilled, (state, action) => {
      state.loading = false;
      state.newLineResponse = action.payload;
    });
    builder.addCase(realizeCustomerDelivery.pending, state => {
      state.loading = true;
    });
    builder.addCase(realizeCustomerDelivery.fulfilled, (state, action) => {
      state.loading = false;
      state.realizeResponse = action.payload;
    });
  },
});

export const customerDeliveryReducer = customerDeliverySlice.reducer;
