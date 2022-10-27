import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '../api/utils';
import {fetchFileDetails} from '../api/metafile-api';

export const getFileDetails = createAsyncThunk(
  'metafile/getFileDetails',
  async function (metafileId, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchFileDetails,
      data: metafileId,
      action: 'fetch metafile details',
      getState,
      responseOptions: {isArrayResponse: true},
    });
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
