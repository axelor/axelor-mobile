import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {searchCrmLeads, getLeadStatus} from '../api/crm-leads-api';

export const fetchLeads = createAsyncThunk(
  'crm/Lead',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchCrmLeads,
      data,
      action: 'fetch crm lead',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchLeadStatus = createAsyncThunk(
  'crm/leadStatus',
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

const initialState = {
  loadingLead: true,
  loadingLeadStatus: true,
  moreLoading: false,
  isListEnd: false,
  leadList: [],
  leadStatusList: [],
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
  },
});

export const leadReducer = leadSlice.reducer;
