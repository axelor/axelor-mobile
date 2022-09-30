import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {searchInternalMoveLines} from '@/modules/stock/api/internal-move-line-api';

export const fetchInternalMoveLines = createAsyncThunk(
  'internalMoveLine/fetchInternalMoveLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchInternalMoveLines,
      data,
      action: 'fetch internal move lines',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingIMLines: false,
  moreLoading: false,
  isListEnd: false,
  internalMoveLineList: [],
};

const internalMoveLineSlice = createSlice({
  name: 'internalMoveLine',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchInternalMoveLines.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingIMLines = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchInternalMoveLines.fulfilled, (state, action) => {
      state.loadingIMLines = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.internalMoveLineList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.internalMoveLineList = [
            ...state.internalMoveLineList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const internalMoveLineReducer = internalMoveLineSlice.reducer;
