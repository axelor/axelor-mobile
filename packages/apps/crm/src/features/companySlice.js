import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {getCompany} from '../api/company-api';

export const fetchCompanyById = createAsyncThunk(
  'lead/getLead',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getCompany,
      data,
      action: 'Crm_SliceAction_FetchCompanyById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingCompany: true,
  company: {},
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchCompanyById.pending, (state, action) => {
      state.loadingCompany = true;
    });
    builder.addCase(fetchCompanyById.fulfilled, (state, action) => {
      state.loadingCompany = false;
      state.company = action.payload;
    });
  },
});

export const companyReducer = companySlice.reducer;
