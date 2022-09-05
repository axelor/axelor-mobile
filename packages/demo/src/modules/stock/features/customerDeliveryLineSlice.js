import {useHandleError} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  searchCustomerDeliveryLines,
  updateLine,
} from '../api/customer-delivery-line-api';

export const fetchCustomerDeliveryLines = createAsyncThunk(
  'CustomerDeliveryLines/fetchCustomerDeliveryLine',
  async function (data) {
    return searchCustomerDeliveryLines(data)
      .catch(function (error) {
        useHandleError(error, 'fetch customer delivery line');
      })
      .then(response => response.data.data);
  },
);

export const updateCustomerDeliveryLine = createAsyncThunk(
  'CustomerDeliveryLines/updateCustomerDeliveryLine',
  async function (data) {
    return updateLine(data)
      .catch(function (error) {
        useHandleError(error, 'update customer delivery line');
      })
      .then(response => response.data.object);
  },
);

const initialState = {
  loadingCDLines: false,
  moreLoading: false,
  isListEnd: false,
  customerDeliveryLineList: [],
  updateLineResponse: {},
};

const CustomerDeliveryLineSlice = createSlice({
  name: 'customerDeliveryLine',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchCustomerDeliveryLines.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingCDLines = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchCustomerDeliveryLines.fulfilled, (state, action) => {
      state.loadingCDLines = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.customerDeliveryLineList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.customerDeliveryLineList = [
            ...state.customerDeliveryLineList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(updateCustomerDeliveryLine.pending, state => {
      state.loadingCDLines = true;
    });
    builder.addCase(updateCustomerDeliveryLine.fulfilled, (state, action) => {
      state.loadingCDLines = false;
      state.updateLineResponse = action.payload;
    });
  },
});

export const customerDeliveryLineReducer = CustomerDeliveryLineSlice.reducer;
