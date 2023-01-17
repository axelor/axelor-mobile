import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {getPartner} from '../api/partner-api';

export const fetchPartner = createAsyncThunk(
  'partner/fetchPartner',
  async function (userId, {getState}) {
    return handlerApiCall({
      fetchFunction: getPartner,
      data: userId,
      action: 'fetch partner',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingPartner: true,
  partner: {},
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
  },
});

export const partnerReducer = partnerSlice.reducer;
