import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchFileDetails} from '@/modules/stock/api/metafile-api';
import {handlerApiCall} from '@/api/utils';

export const getFileDetails = createAsyncThunk(
  'metafile/getFileDetails',
  async function (metafileId, {getState}) {
    return handlerApiCall(
      {fetchFunction: fetchFileDetails},
      metafileId,
      'fetch metafile details',
      {getState},
      {array: true},
    );
  },
);

const initialState = {
  loadingMetafile: false,
  metafile: {},
};

const metafileSlice = createSlice({
  name: 'metafile',
  initialState,
  extraReducers: builder => {
    builder.addCase(getFileDetails.pending, state => {
      state.loadingMetafile = true;
    });
    builder.addCase(getFileDetails.fulfilled, (state, action) => {
      state.loadingMetafile = false;
      state.metafile = action.payload;
    });
  },
});

export const metafileReducer = metafileSlice.reducer;
