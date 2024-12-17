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
import {fetchFileDetails} from '../api/metafile-api';

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

const initialState = {
  loading: false,
  attachedFilesList: [],
};

const attachedFilesSlice = createSlice({
  name: 'attachedFiles',
  initialState,
  extraReducers: builder => {
    builder.addCase(getAttachedFilesDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAttachedFilesDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.attachedFilesList = action.payload;
    });
  },
});

export const attachedFilesReducer = attachedFilesSlice.reducer;
