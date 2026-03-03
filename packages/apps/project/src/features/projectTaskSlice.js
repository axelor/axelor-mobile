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
  updateAgendaItems,
} from '@axelor/aos-mobile-core';
import {
  fetchProjectPriority as _fetchProjectPriority,
  fetchProjectTaskById as _fetchProjectTaskById,
  fetchProjectTaskCategory as _fetchProjectTaskCategory,
  fetchProjectTaskStatus as _fetchProjectTaskStatus,
  getTag as _getTag,
  saveProjectTask as _saveProjectTask,
  searchCategory as _searchCategory,
  searchPriority as _searchPriority,
  searchProjectTask as _searchProjectTask,
  searchProjectTaskLink as _searchProjectTaskLink,
  searchSprint as _searchSprint,
  searchStatus as _searchStatus,
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

export const searchParentTask = createAsyncThunk(
  'project_projectTask/searchParentTask',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProjectTask,
      data,
      action: 'Project_SliceAction_SearchParentTask',
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

export const fetchProjectTaskCategory = createAsyncThunk(
  'project_projectTask/fetchProjectTaskCategory',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchProjectTaskCategory,
      data,
      action: 'Project_SliceAction_FetchProjectTaskCategory',
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

export const getTag = createAsyncThunk(
  'project_projectTask/getTag',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _getTag,
      data,
      action: 'Project_SliceAction_GetTag',
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

export const searchCategory = createAsyncThunk(
  'project_projectTask/searchCategory',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCategory,
      data,
      action: 'Project_SliceAction_SearchCategory',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchPriority = createAsyncThunk(
  'project_projectTask/searchPriority',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPriority,
      data,
      action: 'Project_SliceAction_SearchPriority',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchStatus = createAsyncThunk(
  'project_projectTask/searchStatus',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchStatus,
      data,
      action: 'Project_SliceAction_SearchStatus',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const saveProjectTask = createAsyncThunk(
  'project_projectTask/saveProjectTask',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _saveProjectTask,
      data,
      action: 'Project_SliceAction_SaveProjectTask',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      if (data.projectTask?.id == null) {
        return res;
      } else {
        return handlerApiCall({
          fetchFunction: _fetchProjectTaskById,
          data: {projecTaskId: data?.projectTask?.id},
          action: 'Project_SliceAction_FetchProjectTaskById',
          getState,
          responseOptions: {isArrayResponse: false},
        });
      }
    });
  },
);

export const searchProjectTaskLink = createAsyncThunk(
  'project_projectTask/searchProjectTaskLink',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProjectTaskLink,
      data,
      action: 'Project_SliceAction_SearchProjectTaskLink',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchSprint = createAsyncThunk(
  'project_projectTask/searchSprint',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchSprint,
      data,
      action: 'Project_SliceAction_SearchSprint',
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
  loadingCategory: true,
  moreLoadingCategory: false,
  isListEndCategory: false,
  categoryList: [],

  loadingPriority: true,
  moreLoadingPriority: false,
  isListEndPriority: false,
  priorityList: [],

  loadingStatus: true,
  moreLoadingStatus: false,
  isListEndStatus: false,
  statusList: [],

  loadingTaskLink: true,
  moreLoadingTaskLink: false,
  isListEndTaskLink: false,
  taskLinkList: [],

  projectTaskStatusList: [],
  projectPriorityList: [],
  projectCategoryList: [],

  loadingProjectTask: true,
  projectTask: {},

  loadingTaskTag: true,
  tagList: [],

  loadingSprint: true,
  moreLoadingSprint: false,
  isListEndSprint: false,
  sprintList: [],
};

const projectTaskSlice = createSlice({
  name: 'project_projectTask',
  initialState,
  reducers: {},
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchProjectTask, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'projectTaskList',
    });
    generateInifiniteScrollCases(builder, searchProjectTaskLink, {
      loading: 'loadingTaskLink',
      moreLoading: 'moreLoadingTaskLink',
      isListEnd: 'isListEndTaskLink',
      list: 'taskLinkList',
    });
    generateInifiniteScrollCases(builder, searchTargetVersion, {
      loading: 'loadingTargetVersion',
      moreLoading: 'moreLoadingTargetVersion',
      isListEnd: 'isListEndTargetVersion',
      list: 'targetVersionList',
    });
    generateInifiniteScrollCases(builder, searchParentTask, {
      loading: 'loadingParentTask',
      moreLoading: 'moreLoadingParentTask',
      isListEnd: 'isListEndParentTask',
      list: 'parentTaskList',
    });
    generateInifiniteScrollCases(builder, searchCategory, {
      loading: 'loadingCategory',
      moreLoading: 'moreLoadingCategory',
      isListEnd: 'isListEndCategory',
      list: 'categoryList',
    });
    generateInifiniteScrollCases(builder, searchPriority, {
      loading: 'loadingPriority',
      moreLoading: 'moreLoadingPriority',
      isListEnd: 'isListEndPriority',
      list: 'priorityList',
    });
    generateInifiniteScrollCases(builder, searchStatus, {
      loading: 'loadingStatus',
      moreLoading: 'moreLoadingStatus',
      isListEnd: 'isListEndStatus',
      list: 'statusList',
    });
    generateInifiniteScrollCases(builder, searchSprint, {
      loading: 'loadingSprint',
      moreLoading: 'moreLoadingSprint',
      isListEnd: 'isListEndSprint',
      list: 'sprintList',
    });
    builder.addCase(fetchProjectTaskStatus.fulfilled, (state, action) => {
      state.projectTaskStatusList = action.payload;
    });
    builder.addCase(fetchProjectPriority.fulfilled, (state, action) => {
      state.projectPriorityList = action.payload;
    });
    builder.addCase(fetchProjectTaskCategory.fulfilled, (state, action) => {
      state.projectCategoryList = action.payload;
    });
    builder.addCase(fetchProjectTaskById.pending, state => {
      state.loadingProjectTask = true;
    });
    builder.addCase(fetchProjectTaskById.fulfilled, (state, action) => {
      state.loadingProjectTask = false;
      state.projectTask = action.payload;
    });
    builder.addCase(getTag.pending, state => {
      state.loadingTaskTag = true;
    });
    builder.addCase(getTag.fulfilled, (state, action) => {
      state.loadingTaskTag = false;
      state.tagList = action.payload;
    });
    builder.addCase(saveProjectTask.pending, (state, action) => {
      state.loadingProjectTask = true;
    });
    builder.addCase(saveProjectTask.fulfilled, (state, action) => {
      if (!action.meta.arg?.isCreation) {
        state.projectTask = action.payload;
      }
      state.loadingProjectTask = false;
      state.projectTaskList = updateAgendaItems(state.projectTaskList, [
        action.payload,
      ]);
    });
  },
});

export const projectTaskReducer = projectTaskSlice.reducer;
