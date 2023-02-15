import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall, updateAgendaItems} from '@axelor/aos-mobile-core';
import {
  searchProspect,
  getProspect,
  updateProspectScoring,
  updateProspect as _updateProspect,
} from '../api/prospect-api';

export const fetchProspects = createAsyncThunk(
  'prospect/fetchProspects',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProspect,
      data,
      action: 'fetch crm prospect',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchProspectById = createAsyncThunk(
  'prospect/fetchProspectById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getProspect,
      data,
      action: 'get  prospect by id',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateProspectScore = createAsyncThunk(
  'lead/updateProspectScore',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: updateProspectScoring,
      data,
      action: 'update crm prospect score',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: getProspect,
        data: {partnerId: res?.id},
        action: 'get prospect by id',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const updateProspect = createAsyncThunk(
  'prospect/updateProspect',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateProspect,
      data,
      action: 'update crm prospect ',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: getProspect,
        data: {partnerId: res?.id},
        action: 'get prospect by id',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  prospectList: [],
  prospect: {},
};

const prospectSlice = createSlice({
  name: 'prospect',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProspects.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchProspects.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.prospectList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.prospectList = [...state.prospectList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchProspectById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProspectById.fulfilled, (state, action) => {
      state.loading = false;
      state.prospect = action.payload;
    });
    builder.addCase(updateProspectScore.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProspectScore.fulfilled, (state, action) => {
      state.loading = false;
      state.prospect = action.payload;
      state.prospectList = updateAgendaItems(state.prospectList, [
        action.payload,
      ]);
    });
    builder.addCase(updateProspect.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProspect.fulfilled, (state, action) => {
      state.loading = false;
      state.prospect = action.payload;
      state.prospectList = updateAgendaItems(state.prospectList, [
        action.payload,
      ]);
    });
  },
});

export const prospectReducer = prospectSlice.reducer;
