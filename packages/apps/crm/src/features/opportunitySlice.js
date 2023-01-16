import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {
  getOpportunityStatus,
  searchOpportunities,
} from '../api/opportunities-api';
import {Opportunity} from '../types';

export const fetchOpportunities = createAsyncThunk(
  'crm/fetchOpportunities',
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
  'crm/fetchOpportunityStatus',
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

const initialState = {
  loadingOpportunity: true,
  loadingOpportunityStatus: true,
  moreLoading: false,
  isListEnd: false,
  opportunityList: [],
  opportunityStatusList: [],
};

const opportunitySlice = createSlice({
  name: 'opportunity',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchOpportunities.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingOpportunity = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchOpportunities.fulfilled, (state, action) => {
      state.loadingOpportunity = false;
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
  },
});

export const opportunityReducer = opportunitySlice.reducer;
