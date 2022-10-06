import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {
  fetchChildrenManufacturingOrders,
  fetchManufacturingOrder,
  fetchManufacturingOrderOfProductionOrder,
  searchManufacturingOrderFilter,
} from '../api/manufacturing-order-api';

export const fetchManufacturingOrders = createAsyncThunk(
  'manufacturingOrder/fetchManufacturingOrders',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchManufacturingOrderFilter,
      data,
      action: 'fetch manufacturing order',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchManufOrder = createAsyncThunk(
  'manufacturingOrder/fetchManufOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrder,
      data,
      action: 'fetch manufacturing order from id',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchLinkedManufOrders = createAsyncThunk(
  'manufacturingOrder/fetchLinkedManufOrders',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrderOfProductionOrder,
      data,
      action: 'fetch linked manufacturing orders',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchChildrenOfManufacturingOrder = createAsyncThunk(
  'manufacturingOrder/fetchChildrenOfManufacturingOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchChildrenManufacturingOrders,
      data,
      action: 'fetch children of manufacturing order',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  manufOrderList: [],
  loadingOrder: false,
  manufOrder: {},
  loadingLinkMO: false,
  moreLoadingLinkMO: false,
  isListEndLinkMO: false,
  linkedManufOrders: [],
  loadingChildrenMO: false,
  moreLoadingChildrenMO: false,
  isListEndChildrenMO: false,
  childrenManufOrders: [],
};

const manufacturingOrderSlice = createSlice({
  name: 'manufacturingOrder',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchManufacturingOrders.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchManufacturingOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.manufOrderList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.manufOrderList = [...state.manufOrderList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchManufOrder.pending, state => {
      state.loadingOrder = true;
    });
    builder.addCase(fetchManufOrder.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.manufOrder = action.payload;
    });
    builder.addCase(fetchLinkedManufOrders.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingLinkMO = true;
      } else {
        state.moreLoadingLinkMO = true;
      }
    });
    builder.addCase(fetchLinkedManufOrders.fulfilled, (state, action) => {
      state.loadingLinkMO = false;
      state.moreLoadingLinkMO = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.linkedManufOrders = action.payload;
        state.isListEndLinkMO = false;
      } else {
        if (action.payload != null) {
          state.isListEndLinkMO = false;
          state.linkedManufOrders = [
            ...state.linkedManufOrders,
            ...action.payload,
          ];
        } else {
          state.isListEndLinkMO = true;
        }
      }
    });
    builder.addCase(
      fetchChildrenOfManufacturingOrder.pending,
      (state, action) => {
        if (action.meta.arg.page === 0) {
          state.loadingChildrenMO = true;
        } else {
          state.moreLoadingChildrenMO = true;
        }
      },
    );
    builder.addCase(
      fetchChildrenOfManufacturingOrder.fulfilled,
      (state, action) => {
        state.loadingChildrenMO = false;
        state.moreLoadingChildrenMO = false;
        if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
          state.childrenManufOrders = action.payload;
          state.isListEndChildrenMO = false;
        } else {
          if (action.payload != null) {
            state.isListEndChildrenMO = false;
            state.childrenManufOrders = [
              ...state.childrenManufOrders,
              ...action.payload,
            ];
          } else {
            state.isListEndChildrenMO = true;
          }
        }
      },
    );
  },
});

export const manufacturingOrderReducer = manufacturingOrderSlice.reducer;
