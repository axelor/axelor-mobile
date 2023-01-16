import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {searchContactWithIds} from '../api/contact-api';

export const searchContactById = createAsyncThunk(
  'crm/searchContactById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchContactWithIds,
      data,
      action: 'filter contact by id',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  listContactById: [],
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchContactById.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchContactById.fulfilled, (state, action) => {
      state.loading = false;
      state.listContactById = action.payload;
    });
  },
});

export const contactReducer = contactSlice.reducer;
