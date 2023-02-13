import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall, updateAgendaItems} from '@axelor/aos-mobile-core';
import {
  searchLeads,
  getLeadStatus,
  getLead,
  updateLeadScoring,
  updateLead as _updateLead,
} from '../api/leads-api';

export const fetchLeads = createAsyncThunk(
  'lead/Lead',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchLeads,
      data,
      action: 'fetch crm lead',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchLeadStatus = createAsyncThunk(
  'lead/leadStatus',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getLeadStatus,
      data,
      action: 'fetch crm leadStatus',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchLeadById = createAsyncThunk(
  'lead/getLead',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getLead,
      data,
      action: 'get crm lead by id',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateLeadScore = createAsyncThunk(
  'lead/updateLeadScore',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: updateLeadScoring,
      data,
      action: 'update crm lead score',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: getLead,
        data: {leadId: res?.id},
        action: 'get lead by id',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const updateLead = createAsyncThunk(
  'lead/updateLead',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateLead,
      data,
      action: 'update crm lead ',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: getLead,
        data: {leadId: res?.id},
        action: 'get lead by id',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

const initialState = {
  loadingLead: true,
  loadingLeadStatus: true,
  moreLoading: false,
  isListEnd: false,
  leadList: [],
  leadStatusList: [],
  lead: {},
};

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchLeads.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingLead = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.loadingLead = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.leadList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.leadList = [...state.leadList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchLeadStatus.pending, state => {
      state.loadingLeadStatus = true;
    });
    builder.addCase(fetchLeadStatus.fulfilled, (state, action) => {
      state.loadingLeadStatus = false;
      state.leadStatusList = action.payload;
    });
    builder.addCase(fetchLeadById.pending, (state, action) => {
      state.loadingLead = true;
    });
    builder.addCase(fetchLeadById.fulfilled, (state, action) => {
      state.loadingLead = false;
      state.lead = action.payload;
    });
    builder.addCase(updateLeadScore.pending, (state, action) => {
      state.loadingLead = true;
    });
    builder.addCase(updateLeadScore.fulfilled, (state, action) => {
      state.loadingLead = false;
      state.lead = action.payload;
      state.leadList = updateAgendaItems(state.leadList, [action.payload]);
    });
    builder.addCase(updateLead.pending, (state, action) => {
      state.loadingLead = true;
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      state.loadingLead = false;
      state.lead = action.payload;
      state.leadList = updateAgendaItems(state.leadList, [action.payload]);
    });
  },
});

export const leadReducer = leadSlice.reducer;
