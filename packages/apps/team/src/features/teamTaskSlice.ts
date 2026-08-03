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
import {searchTeamTasks as _searchTeamTasks} from '../api/team-task-api';

export const searchTeamTasks = createAsyncThunk(
  'team_teamTask/searchTeamTasks',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchTeamTasks,
      data,
      action: 'Team_SliceAction_SearchTeamTasks',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingTeamTasks: false,
  moreLoadingTeamTask: false,
  isListEndTeamTask: false,
  teamTaskList: [],
};

const teamTaskSlice = createSlice({
  name: 'team_teamTask',
  initialState,
  reducers: {},
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchTeamTasks, {
      loading: 'loadingTeamTasks',
      moreLoading: 'moreLoadingTeamTask',
      isListEnd: 'isListEndTeamTask',
      list: 'teamTaskList',
    });
  },
});

export const teamTaskReducer = teamTaskSlice.reducer;
