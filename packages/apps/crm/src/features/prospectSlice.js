import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {searchProspect} from '../api/prospect-api';

export const fetchProspects = createAsyncThunk(
  'crm/Prospect',
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

const initialState = {
  loadingProspect: true,
  moreLoading: false,
  isListEnd: false,
  prospectList: [],
};

const prospectSlice = createSlice({
  name: 'prospect',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProspects.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingProspect = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchProspects.fulfilled, (state, action) => {
      state.loadingProspect = false;
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
  },
});

export const prospectReducer = prospectSlice.reducer;
