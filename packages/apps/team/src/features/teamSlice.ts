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
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {searchTeams as _searchTeams} from '../api/team-api';

export const searchTeams = createAsyncThunk(
  'team_team/searchTeams',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchTeams,
      data,
      action: 'Team_SliceAction_SearchTeams',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingTeams: false,
  moreLoadingTeam: false,
  isListEndTeam: false,
  teamList: [],
};

const teamSlice = createSlice({
  name: 'team_team',
  initialState,
  reducers: {},
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchTeams, {
      loading: 'loadingTeams',
      moreLoading: 'moreLoadingTeam',
      isListEnd: 'isListEndTeam',
      list: 'teamList',
    });
  },
});

export const teamReducer = teamSlice.reducer;
