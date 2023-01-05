import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {searchCompany} from '@/modules/auth/api/company-api';

export const fetchCompanies = createAsyncThunk(
  'company/fetchCompany',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchCompany,
      data,
      action: 'fetch companies',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  companyList: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchCompanies.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.loading = false;
      state.companyList = action.payload;
    });
  },
});

export const companyReducer = companySlice.reducer;
