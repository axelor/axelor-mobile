import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {getPartner, searchClientAndProspect} from '../api/partner-api';

export const fetchPartner = createAsyncThunk(
  'partner/fetchPartner',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getPartner,
      data,
      action: 'fetch partner',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchClientAndProspect = createAsyncThunk(
  'client/fetchClients',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchClientAndProspect,
      data,
      action: 'fetch crm client and prospect',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingPartner: true,
  partner: {},
  clientAndProspectList: [],
  loading: false,
  moreLoading: false,
  isListEnd: false,
};

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchPartner.pending, state => {
      state.loadingPartner = true;
    });
    builder.addCase(fetchPartner.fulfilled, (state, action) => {
      state.loadingPartner = false;
      state.partner = action.payload;
    });
    builder.addCase(fetchClientAndProspect.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchClientAndProspect.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.clientAndProspectList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.clientAndProspectList = [
            ...state.clientAndProspectList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const partnerReducer = partnerSlice.reducer;
