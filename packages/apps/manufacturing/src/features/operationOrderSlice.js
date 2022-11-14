import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {
  searchOperationOrderFilter,
  fetchOperationOrder,
  updateOperationOrderStatus,
} from '../api/operation-order-api';

export const fetchOperationOrders = createAsyncThunk(
  'operationOrder/fetchOperationOrders',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchOperationOrderFilter,
      data,
      action: 'fetch operation orders',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchOperationOrderById = createAsyncThunk(
  'OperationOrder/fetchOperationOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchOperationOrder,
      data,
      action: 'fetch operation order by id',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateOperationOrder = createAsyncThunk(
  'OperationOrder/updateOperationOrderStatus',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateOperationOrderStatus,
      data: data,
      action: 'update operation order status',
      getState: getState,
      responseOptions: {showToast: true},
    }).then(object =>
      handlerApiCall({
        fetchFunction: fetchOperationOrder,
        data: {operationOrderId: object.id},
        action: 'fetch operation order by id',
        getState: getState,
        responseOptions: {isArrayResponse: false},
      }),
    );
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  operationOrderList: [],
  loadingOrder: false,
  operationOrder: {},
};

const operationOrderSlice = createSlice({
  name: 'operationOrder',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchOperationOrders.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchOperationOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.operationOrderList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.operationOrderList = [
            ...state.operationOrderList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchOperationOrderById.pending, state => {
      state.loadingOrder = true;
    });
    builder.addCase(fetchOperationOrderById.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.operationOrder = action.payload;
    });
    builder.addCase(updateOperationOrder.pending, state => {
      state.loadingOrder = true;
    });
    builder.addCase(updateOperationOrder.rejected, (state, action) => {
      state.loadingOrder = false;
    });
    builder.addCase(updateOperationOrder.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.operationOrder = action.payload;
    });
  },
});

export const operationOrderReducer = operationOrderSlice.reducer;
