import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {searchCrmLeads, getLeadStatus} from '../api/crm-leads-api';

export const fetchCrmLeads = createAsyncThunk(
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

export const fetchCrmLeadStatus = createAsyncThunk(
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
  loadingCrmLead: true,
  loadingCrmLeadStatus: true,
  moreLoading: false,
  isListEnd: false,
  crmLeadList: [],
  crmLeadStatusList: [],
};

const crmLeadSlice = createSlice({
  name: 'crmLead',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchCrmLeads.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingCrmLead = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchCrmLeads.fulfilled, (state, action) => {
      state.loadingCrmLead = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.crmLeadList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.crmLeadList = [...state.crmLeadList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchCrmLeadStatus.pending, state => {
      state.loadingCrmLeadStatus = true;
    });
    builder.addCase(fetchCrmLeadStatus.fulfilled, (state, action) => {
      state.loadingCrmLeadStatus = false;
      state.crmLeadStatusList = action.payload;
    });
  },
});

export const crmLeadReducer = crmLeadSlice.reducer;
