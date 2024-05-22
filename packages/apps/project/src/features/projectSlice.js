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
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {
  fetchProjectStatus as _fetchProjectStatus,
  searchProject as _searchProject,
} from '../api/project-api';

export const searchProject = createAsyncThunk(
  'project_project/searchProject',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProject,
      data,
      action: 'Project_SliceAction_SearchProject',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchProjectStatus = createAsyncThunk(
  'project_project/fetchProjectStatus',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchProjectStatus,
      data,
      action: 'Project_SliceAction_FetchProjectStatus',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  projectList: [],

  projectStatusList: [],
};

const projectSlice = createSlice({
  name: 'project_project',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchProject, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'projectList',
    });
    builder.addCase(fetchProjectStatus.fulfilled, (state, action) => {
      state.projectStatusList = action.payload;
    });
  },
});

export const projectReducer = projectSlice.reducer;
