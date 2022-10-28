import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {
  searchInternalMoveFilter,
  createInternalStockMove,
  updateInternalStockMove,
} from '../api/internal-move-api';

export const searchInternalMoves = createAsyncThunk(
  'internalMove/searchInternalMoves',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchInternalMoveFilter,
      data,
      action: 'filter internal moves',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const createInternalMove = createAsyncThunk(
  'internalMove/createInternalMove',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createInternalStockMove,
      data,
      action: 'create internal move',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const updateInternalMove = createAsyncThunk(
  'internalMove/updateInternalMove',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateInternalStockMove,
      data,
      action: 'update internal move',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loadingInternalMove: false,
  moreLoading: false,
  isListEnd: false,
  internalMoveList: [],
  createResponse: {},
  updateResponse: {},
};

const internalMoveSlice = createSlice({
  name: 'internalMove',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchInternalMoves.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingInternalMove = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(searchInternalMoves.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.internalMoveList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.internalMoveList = [
            ...state.internalMoveList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(createInternalMove.pending, state => {
      state.loadingInternalMove = true;
    });
    builder.addCase(createInternalMove.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.createResponse = action.payload;
    });
    builder.addCase(updateInternalMove.pending, state => {
      state.loadingInternalMove = true;
    });
    builder.addCase(updateInternalMove.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.updateResponse = action.payload;
    });
  },
});

export const internalMoveReducer = internalMoveSlice.reducer;
