import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {
  postEventBIdList,
  partnerEventById,
  contactEventById,
} from '../api/event-api';

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

export const fetchContactEventById = createAsyncThunk(
  'crm/fetchContactEventById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: contactEventById,
      data,
      action: 'fetch crm contactEvent',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  listEventById: [],
  listEventPartner: [],
  listEventContact: [],
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
    builder.addCase(fetchContactEventById.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchContactEventById.fulfilled, (state, action) => {
      state.loading = false;
      state.listEventContact = action.payload;
    });
  },
});

export const eventReducer = eventtSlice.reducer;
