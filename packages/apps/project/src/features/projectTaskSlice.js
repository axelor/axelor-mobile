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
  fetchProjectPriority as _fetchProjectPriority,
  fetchProjectTaskById as _fetchProjectTaskById,
  fetchProjectTaskStatus as _fetchProjectTaskStatus,
  searchProjectTask as _searchProjectTask,
} from '../api/project-task-api';

export const searchProjectTask = createAsyncThunk(
  'project_projectTask/searchProjectTask',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProjectTask,
      data,
      action: 'Project_SliceAction_SearchProjectTask',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchProjectTaskStatus = createAsyncThunk(
  'project_projectTask/fetchProjectTaskStatus',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchProjectTaskStatus,
      data,
      action: 'Project_SliceAction_FetchProjectTaskStatus',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchProjectPriority = createAsyncThunk(
  'project_projectTask/fetchProjectPriority',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchProjectPriority,
      data,
      action: 'Project_SliceAction_FetchProjectPriority',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchProjectTaskById = createAsyncThunk(
  'project_projectTask/fetchProjectTaskById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchProjectTaskById,
      data,
      action: 'Project_SliceAction_FetchProjectTaskById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  projectTaskList: [],

  projectTaskStatusList: [],
  projectPriorityList: [],

  loadingProjectTask: true,
  projectTask: {},

  tagList: [],
};

const projectTaskSlice = createSlice({
  name: 'project_projectTask',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchProjectTask, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'projectTaskList',
    });
    builder.addCase(fetchProjectTaskStatus.fulfilled, (state, action) => {
      state.projectTaskStatusList = action.payload;
    });
    builder.addCase(fetchProjectPriority.fulfilled, (state, action) => {
      state.projectPriorityList = action.payload;
    });
    builder.addCase(fetchProjectTaskById.pending, state => {
      state.loadingProjectTask = true;
    });
    builder.addCase(fetchProjectTaskById.fulfilled, (state, action) => {
      state.loadingProjectTask = false;
      state.projectTask = action.payload;
    });
  },
});

export const projectTaskReducer = projectTaskSlice.reducer;
