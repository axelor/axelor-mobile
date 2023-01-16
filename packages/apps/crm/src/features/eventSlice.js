import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {postEventBIdList, partnerEventById} from '../api/event-api';

export const searchEventById = createAsyncThunk(
  'crm/searchEventById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: postEventBIdList,
      data,
      action: 'filter evenr  by id',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchPartnerEventById = createAsyncThunk(
  'crm/fetchPartnerEventById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: partnerEventById,
      data,
      action: 'fetch crm partnerEvent',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  listEventById: [],
  listEventPartner: [],
};

const eventtSlice = createSlice({
  name: 'contact',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchEventById.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchEventById.fulfilled, (state, action) => {
      state.loading = false;
      state.listEventById = action.payload;
    });
    builder.addCase(fetchPartnerEventById.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPartnerEventById.fulfilled, (state, action) => {
      state.loading = false;
      state.listEventPartner = action.payload;
    });
  },
});

export const eventReducer = eventtSlice.reducer;
