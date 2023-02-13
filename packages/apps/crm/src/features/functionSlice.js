import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {getFunction} from '../api/function-api';

export const fetchFunction = createAsyncThunk(
  'Function/fetchFunction',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: getFunction,
      data,
      action: 'fetch function',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);
const initialState = {
  loadingFunction: true,
  functionList: [],
};

const functionSlice = createSlice({
  name: 'function',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchFunction.pending, state => {
      state.loadingFunction = true;
    });
    builder.addCase(fetchFunction.fulfilled, (state, action) => {
      state.loadingFunction = false;
      state.functionList = action.payload;
    });
  },
});

export const functionReducer = functionSlice.reducer;
