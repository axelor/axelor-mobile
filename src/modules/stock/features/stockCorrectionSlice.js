import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  searchStockCorrection,
  createStockCorrection,
  updateStockCorrection,
} from '@/modules/stock/api/stock-correction-api';

export const fetchStockCorrections = createAsyncThunk(
  'stockCorrection/fetchStockCorrection',
  async function () {
    return searchStockCorrection().then(response => response.data.data);
  },
);

export const createCorrection = createAsyncThunk(
  'stockCorrection/createStockCorrection',
  async function (data) {
    return createStockCorrection(data)
      .catch(function (error) {
        if (error.response) {
          console.log('Error got caugth: ');
          console.log(error.response.data);
        }
      })
      .then(response => response.data.object);
  },
);

export const updateCorrection = createAsyncThunk(
  'stockCorrection/updateStockCorrection',
  async function (data) {
    return updateStockCorrection(data)
      .catch(function (error) {
        if (error.response) {
          console.log('Error got caugth: ');
          console.log(error.response.data);
        }
      })
      .then(response => response.data.object);
  },
);

const initialState = {
  loadingStockCorrection: true,
  stockCorrectionList: [],
  createResponse: {},
  updateResponse: {},
  errorBody: {},
};

const stockCorrectionSlice = createSlice({
  name: 'stockCorrection',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockCorrections.pending, state => {
      state.loadingStockCorrection = true;
    });
    builder.addCase(fetchStockCorrections.fulfilled, (state, action) => {
      state.loadingStockCorrection = false;
      state.stockCorrectionList = action.payload;
    });
    builder.addCase(createCorrection.pending, state => {
      state.loadingStockCorrection = true;
    });
    builder.addCase(createCorrection.fulfilled, (state, action) => {
      state.loadingStockCorrection = false;
      state.createResponse = action.payload;
    });
    builder.addCase(createCorrection.rejected, (state, action) => {
      state.loadingStockCorrection = false;
      state.error = action;
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
