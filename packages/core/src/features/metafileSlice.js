/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

export const getFileDetails = createAsyncThunk(
  'metafile/getFileDetails',
  async function (metafileId, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchFileDetails,
      data: metafileId,
      action: 'Base_SliceAction_FetchFilesDetails',
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
