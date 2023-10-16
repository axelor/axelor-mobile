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
import {fetchAnomalies as _fetchAnomalies} from '../api/anomaly-api';

export const fetchAnomalies = createAsyncThunk(
  'anomaly/fetchAnomalies',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchAnomalies,
      data,
      action: 'Base_SliceAction_FetchAnomalies',
      getState: getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingAnomaly: true,
  anomalyList: [],
};

const anomalySlice = createSlice({
  name: 'anomaly',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchAnomalies.pending, state => {
      state.loadingAnomaly = true;
    });
    builder.addCase(fetchAnomalies.fulfilled, (state, action) => {
      state.loadingAnomaly = false;
      state.anomalyList = action.payload?.checks;
    });
  },
});

export const anomalyReducer = anomalySlice.reducer;
