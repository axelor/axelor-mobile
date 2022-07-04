import {handleError} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  addLineStockMove,
  realizeSockMove,
  searchSupplierArrival,
  searchSupplierArrivalFilter,
} from '../api/supplier-arrival-api';

export const fetchSupplierArrivals = createAsyncThunk(
  'arrivals/fetchSupplierArrivals',
  async function (data) {
    return searchSupplierArrival(data)
      .catch(function (error) {
        handleError(error, 'fetch supplier arrival');
      })
      .then(response => response.data.data);
  },
);

export const searchSupplierArrivals = createAsyncThunk(
  'arrivals/searchSupplierArrivals',
  async function (data) {
    return searchSupplierArrivalFilter(data)
      .catch(function (error) {
        handleError(error, 'filter supplier arrival');
      })
      .then(response => response.data.data);
  },
);

export const addNewLine = createAsyncThunk(
  'arrivals/addNewLine',
  async function (data) {
    return addLineStockMove(data)
      .catch(function (error) {
        handleError(error, 'add new line to supplier arrival');
      })
      .then(response => response.data.object);
  },
);

export const realizeSupplierArrival = createAsyncThunk(
  'arrivals/realizeSupplierArrival',
  async function (data) {
    return realizeSockMove(data)
      .catch(function (error) {
        handleError(error, 'realize supplier arrival');
      })
      .then(response => response.data.object);
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  supplierArrivalsList: [],
  newLineResponse: {},
  realizeResponse: {},
};

const supplierArrivalSlice = createSlice({
  name: 'supplierArrivals',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchSupplierArrivals.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchSupplierArrivals.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.supplierArrivalsList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.supplierArrivalsList = [
            ...state.supplierArrivalsList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(searchSupplierArrivals.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchSupplierArrivals.fulfilled, (state, action) => {
      state.loading = false;
      state.isListEnd = false;
      state.supplierArrivalsList = action.payload;
    });
    builder.addCase(addNewLine.pending, state => {
      state.loading = true;
    });
    builder.addCase(addNewLine.fulfilled, (state, action) => {
      state.loading = false;
      state.newLineResponse = action.payload;
    });
    builder.addCase(realizeSupplierArrival.pending, state => {
      state.loading = true;
    });
    builder.addCase(realizeSupplierArrival.fulfilled, (state, action) => {
      state.loading = false;
      state.realizeResponse = action.payload;
    });
  },
});

export const supplierArrivalReducer = supplierArrivalSlice.reducer;
