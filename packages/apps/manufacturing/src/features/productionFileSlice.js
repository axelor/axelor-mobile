import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {searchProductionFile} from '../api/production-file-api';

export const fetchProductionFile = createAsyncThunk(
  'productionFile/fetchProductionFile',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProductionFile,
      data: data,
      action: 'fetch production file',
      getState: getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  productionFileList: [],
};

const productionFileSlice = createSlice({
  name: 'productionFile',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProductionFile.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchProductionFile.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.productionFileList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.productionFileList = [
            ...state.productionFileList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const productionFileReducer = productionFileSlice.reducer;
