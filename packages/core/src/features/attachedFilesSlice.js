import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '../api/utils';
import {fetchAttachedFiles} from '../api/attached-files-api';

export const getAttachedFiles = createAsyncThunk(
  'attachedFiles/getAttachedFiles',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchAttachedFiles,
      data: data,
      action: 'fetch attached files',
      getState: getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  attachedFilesList: [],
};

const attachedFilesSlice = createSlice({
  name: 'attachedFiles',
  initialState,
  extraReducers: builder => {
    builder.addCase(getAttachedFiles.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAttachedFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.attachedFilesList = action.payload;
    });
  },
});

export const attachedFilesReducer = attachedFilesSlice.reducer;
