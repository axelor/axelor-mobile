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
  getProjectTaskTag as _getProjectTaskTag,
  searchProjectTask as _searchProjectTask,
  searchTargetVersion as _searchTargetVersion,
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

export const searchProjectParentTask = createAsyncThunk(
  'project_projectTask/searchProjectParentTask',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProjectTask,
      data,
      action: 'Project_SliceAction_SearchProjectParentTask',
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

export const getProjectTaskTag = createAsyncThunk(
  'project_projectTask/getProjectTaskTag',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _getProjectTaskTag,
      data,
      action: 'Project_SliceAction_GetProjectTaskTag',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchTargetVersion = createAsyncThunk(
  'project_projectTask/searchTargetVersion',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchTargetVersion,
      data,
      action: 'Project_SliceAction_SearchTargetVersion',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  projectTaskList: [],

  loadingParentTask: true,
  moreLoadingParentTask: false,
  isListEndParentTask: false,
  parentTaskList: [],

  loadingTargetVersion: true,
  moreLoadingTargetVersion: false,
  isListEndTargetVersion: false,
  targetVersionList: [],

  projectTaskStatusList: [],
  projectPriorityList: [],

  loadingProjectTask: true,
  projectTask: {},

  loadingTaskTag: true,
  taskTagList: [],
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
    generateInifiniteScrollCases(builder, searchTargetVersion, {
      loading: 'loadingTargetVersion',
      moreLoading: 'moreLoadingTargetVersion',
      isListEnd: 'isListEndTargetVersion',
      list: 'targetVersionList',
    });
    generateInifiniteScrollCases(builder, searchProjectParentTask, {
      loading: 'loadingParentTask',
      moreLoading: 'moreLoadingParentTask',
      isListEnd: 'isListEndParentTask',
      list: 'parentTaskList',
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
    builder.addCase(getProjectTaskTag.pending, state => {
      state.loadingTaskTag = true;
    });
    builder.addCase(getProjectTaskTag.fulfilled, (state, action) => {
      state.loadingTaskTag = false;
      state.taskTagList = action.payload;
    });
  },
});

export const projectTaskReducer = projectTaskSlice.reducer;
