/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '../apiProviders/utils';
import {countAttachments, fetchAttachedFiles} from '../api/attached-files-api';
import {fetchFileDetails} from '../api/metafile-api';

export const getAttachedFiles = createAsyncThunk(
  'attachedFiles/getAttachedFiles',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchAttachedFiles,
      data: data,
      action: 'Base_SliceAction_FetchAttachedFiles',
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
      action: 'Base_SliceAction_FetchFilesDetails',
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
      action: 'Base_SliceAction_CountAttachedFiles',
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
