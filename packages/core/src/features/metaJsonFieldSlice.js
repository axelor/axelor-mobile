/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {fetchJsonFieldsOfModel as _fetchJsonFieldsOfModel} from '../forms/studio/api.helpers';

export const fetchJsonFieldsOfModel = createAsyncThunk(
  'metaJsonField/fetchJsonFieldsOfModel',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchJsonFieldsOfModel,
      data: data,
      action: 'Base_SliceAction_FetchJsonFieldsOfModel',
      getState: getState,
      responseOptions: {isArrayResponse: true, showToast: false},
    });
  },
);

const initialState = {
  fields: [],
};

const metaJsonFieldSlice = createSlice({
  name: 'metaJsonField',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchJsonFieldsOfModel.fulfilled, (state, action) => {
      state.fields = action.payload;
    });
  },
});

export const metaJsonFieldReducer = metaJsonFieldSlice.reducer;
