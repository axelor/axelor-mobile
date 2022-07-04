import {handleError} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  searchSupplierArrivalLines,
  updateLine,
} from '../api/supplier-arrival-line';

export const fetchSupplierArrivalLines = createAsyncThunk(
  'SupplierLines/fetchSupplierLine',
  async function (data) {
    return searchSupplierArrivalLines(data)
      .catch(function (error) {
        handleError(error, 'fetch supplier arrival lines');
      })
      .then(response => response.data.data);
  },
);

export const updateSupplierArrivalLine = createAsyncThunk(
  'SupplierLines/updateSupplierArrivalLine',
  async function (data) {
    return updateLine(data)
      .catch(function (error) {
        handleError(error, 'update supplier arrival line');
      })
      .then(response => response.data.object);
  },
);

const initialState = {
  loadingSALines: false,
  moreLoading: false,
  isListEnd: false,
  supplierArrivalLineList: [],
  updateLineResponse: {},
};

const supplierArrivalLineSlice = createSlice({
  name: 'supplierArrivalLine',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchSupplierArrivalLines.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingSALines = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchSupplierArrivalLines.fulfilled, (state, action) => {
      state.loadingSALines = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.supplierArrivalLineList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.supplierArrivalLineList = [
            ...state.supplierArrivalLineList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(updateSupplierArrivalLine.pending, state => {
      state.loadingSupplierArrivalLine = true;
    });
    builder.addCase(updateSupplierArrivalLine.fulfilled, (state, action) => {
      state.loadingSupplierArrivalLine = false;
      state.updateLineResponse = action.payload;
    });
  },
});

export const supplierArrivalLineReducer = supplierArrivalLineSlice.reducer;
