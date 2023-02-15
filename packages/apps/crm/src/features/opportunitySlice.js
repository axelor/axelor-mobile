import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall, updateAgendaItems} from '@axelor/aos-mobile-core';
import {
  getOpportunityStatus,
  searchOpportunities,
  getOpportunity as _getOpportunity,
  updateOpportunityStatus as _updateOpportunityStatus,
  updateOpportunity as _updateOpportunity,
} from '../api/opportunities-api';
import {Opportunity} from '../types';

export const fetchOpportunities = createAsyncThunk(
  'opportunity/fetchOpportunities',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchOpportunities,
      data,
      action: 'fetch crm opportunites',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchOpportunityStatus = createAsyncThunk(
  'opportunity/fetchOpportunityStatus',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getOpportunityStatus,
      data,
      action: 'fetch crm opportunity status',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const getOpportunity = createAsyncThunk(
  'opportunity/getOpportunity',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _getOpportunity,
      data,
      action: 'get crm opportunity',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateOpportunityStatus = createAsyncThunk(
  'opportunity/updateOpportunityStatus',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateOpportunityStatus,
      data,
      action: 'update crm opportunity status',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res =>
      handlerApiCall({
        fetchFunction: _getOpportunity,
        data: {opportunityId: res?.id},
        action: 'get crm opportunity',
        getState,
        responseOptions: {isArrayResponse: false},
      }),
    );
  },
);

export const updateOpportunity = createAsyncThunk(
  'opportunity/updateOpportunity',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateOpportunity,
      data,
      action: 'update crm opportunity ',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: _getOpportunity,
        data: {opportunityId: res?.id},
        action: 'get opportunity by id',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

const initialState = {
  loading: false,
  loadingOpportunity: false,
  loadingOpportunityStatus: false,
  moreLoading: false,
  isListEnd: false,
  opportunityList: [],
  opportunityStatusList: [],
  opportunity: {},
};

const opportunitySlice = createSlice({
  name: 'opportunity',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchOpportunities.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchOpportunities.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.opportunityList = action.payload.map(item =>
          Opportunity.responseParser(item),
        );
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.opportunityList = [
            ...state.opportunityList,
            ...action.payload.map(item => Opportunity.responseParser(item)),
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchOpportunityStatus.pending, state => {
      state.loadingOpportunityStatus = true;
    });
    builder.addCase(fetchOpportunityStatus.fulfilled, (state, action) => {
      state.loadingOpportunityStatus = false;
      state.opportunityStatusList = action.payload;
    });
    builder.addCase(getOpportunity.pending, state => {
      state.loadingOpportunity = true;
    });
    builder.addCase(getOpportunity.fulfilled, (state, action) => {
      state.loadingOpportunity = false;
      state.opportunity = action.payload;
    });
    builder.addCase(updateOpportunityStatus.pending, (state, action) => {
      state.loadingOpportunity = true;
    });
    builder.addCase(updateOpportunityStatus.fulfilled, (state, action) => {
      state.loadingOpportunity = false;
      state.opportunity = action.payload;
    });
    builder.addCase(updateOpportunity.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateOpportunity.fulfilled, (state, action) => {
      state.loading = false;
      state.opportunity = action.payload;
      state.opportunityList = updateAgendaItems(state.opportunityList, [
        action.payload,
      ]);
    });
  },
});

export const opportunityReducer = opportunitySlice.reducer;
