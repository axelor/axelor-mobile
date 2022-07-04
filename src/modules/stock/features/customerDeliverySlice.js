import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  addLineStockMove,
  realizeSockMove,
  searchDelivery,
  searchDeliveryFilter,
} from '@/modules/stock/api/customer-delivery-api';
import {handleError} from '@/api/utils';

export const fetchDeliveries = createAsyncThunk(
  'deliveries/fetchDeliveries',
  async function (data) {
    return searchDelivery(data)
      .catch(function (error) {
        handleError(error, 'fetch customer deliveries');
      })
      .then(response => {
        return response.data.data;
      });
  },
);

export const searchDeliveries = createAsyncThunk(
  'deliveries/searchDeliveries',
  async function (data) {
    return searchDeliveryFilter(data)
      .catch(function (error) {
        handleError(error, 'filter customer deliveries');
      })
      .then(response => {
        return response.data.data;
      });
  },
);

export const addNewLine = createAsyncThunk(
  'deliveries/addNewLine',
  async function (data) {
    return addLineStockMove(data)
      .catch(function (error) {
        handleError(error, 'add new line to customer delivery');
      })
      .then(response => response.data.object);
  },
);

export const realizeCustomerDelivery = createAsyncThunk(
  'deliveries/realizeCustomerDelivery',
  async function (data) {
    return realizeSockMove(data)
      .catch(function (error) {
        handleError(error, 'realize customer delivery');
      })
      .then(response => response.data.object);
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
    builder.addCase(fetchDeliveries.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchDeliveries.fulfilled, (state, action) => {
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
    builder.addCase(searchDeliveries.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchDeliveries.fulfilled, (state, action) => {
      state.loading = false;
      state.isListEnd = false;
      state.deliveryList = action.payload;
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
