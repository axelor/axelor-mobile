/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {handlerApiCall} from '../../apiProviders/utils';
import {searchLocalization} from '../api/localisation-api';

export const fetchLocalisations = createAsyncThunk(
  'localisation/fetchLocalisations',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchLocalization,
      data,
      action: 'Auth_SliceAction_FetchLanguages',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  localizationList: [],
};

const localisationSlice = createSlice({
  name: 'localisation',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchLocalisations.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchLocalisations.fulfilled, (state, action) => {
      state.loading = false;
      state.localizationList = action.payload;
    });
  },
});

export const localisationReducer = localisationSlice.reducer;
