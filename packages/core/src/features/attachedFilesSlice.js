import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '../api/utils';
import {countAttachments, fetchAttachedFiles} from '../api/attached-files-api';
import {fetchFileDetails} from '../api/metafile-api';

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

export const getAttachedFilesDetails = createAsyncThunk(
  'attachedFiles/getAttachedFilesDetails',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchFileDetails,
      data: data,
      action: 'fetch attached files details',
      getState: getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const countAttachmentFiles = createAsyncThunk(
  'attachedFiles/countAttachmentFiles',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: countAttachments,
      data: data,
      action: 'count attachment files',
      getState: getState,
      responseOptions: {isArrayResponse: true, returnTotal: true},
    });
  },
);

const initialState = {
  loading: false,
  attachedFilesList: [],
  attachments: 0,
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
    builder.addCase(getAttachedFilesDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAttachedFilesDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.attachedFilesList = action.payload;
    });
    builder.addCase(countAttachmentFiles.pending, state => {
      state.loading = true;
    });
    builder.addCase(countAttachmentFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.attachments = action.payload;
    });
  },
});

export const attachedFilesReducer = attachedFilesSlice.reducer;
