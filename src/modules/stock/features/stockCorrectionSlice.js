import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  searchStockCorrection,
  createStockCorrection,
  updateStockCorrection,
} from '@/modules/stock/api/stock-correction-api';
import {useHandleError} from '@/api/utils';

export const fetchStockCorrections = createAsyncThunk(
  'stockCorrection/fetchStockCorrection',
  async function (data) {
    return searchStockCorrection(data)
      .catch(function (error) {
        useHandleError(error, 'fetch stock corrections');
      })
      .then(response => response.data.data);
  },
);

export const createCorrection = createAsyncThunk(
  'stockCorrection/createStockCorrection',
  async function (data) {
    return createStockCorrection(data)
      .catch(function (error) {
        useHandleError(error, 'create stock correction');
      })
      .then(response => response.data.object);
  },
);

export const updateCorrection = createAsyncThunk(
  'stockCorrection/updateStockCorrection',
  async function (data) {
    return updateStockCorrection(data)
      .catch(function (error) {
        useHandleError(error, 'update stock correction');
      })
      .then(response => response.data.object);
  },
);

const initialState = {
  loadingStockCorrection: true,
  moreLoading: false,
  isListEnd: false,
  stockCorrectionList: [],
  createResponse: {},
  updateResponse: {},
};

const stockCorrectionSlice = createSlice({
  name: 'stockCorrection',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockCorrections.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingStockCorrection = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchStockCorrections.fulfilled, (state, action) => {
      state.loadingStockCorrection = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.stockCorrectionList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.stockCorrectionList = [
            ...state.stockCorrectionList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(createCorrection.pending, state => {
      state.loadingStockCorrection = true;
    });
    builder.addCase(createCorrection.fulfilled, (state, action) => {
      state.loadingStockCorrection = false;
      state.createResponse = action.payload;
    });
    builder.addCase(updateCorrection.pending, state => {
      state.loadingStockCorrection = true;
    });
    builder.addCase(updateCorrection.fulfilled, (state, action) => {
      state.loadingStockCorrection = false;
      state.updateResponse = action.payload;
    });
  },
});

export const stockCorrectionReducer = stockCorrectionSlice.reducer;
