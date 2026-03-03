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
  handlerApiCall,
  generateInifiniteScrollCases,
} from '@axelor/aos-mobile-core';
import {
  searchProduct as _searchProduct,
  searchProject as _searchProject,
  searchProjectTask as _searchProjectTask,
} from '../api/project-api';

export const searchProject = createAsyncThunk(
  'hr_project/searchProject',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProject,
      data,
      action: 'Hr_SliceAction_FetchProject',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchProjectTask = createAsyncThunk(
  'hr_project/searchProjectTask',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProjectTask,
      data,
      action: 'Hr_SliceAction_FetchProjectTask',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchProduct = createAsyncThunk(
  'hr_project/searchProduct',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProduct,
      data,
      action: 'Hr_SliceAction_FetchProduct',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  project: {},

  loadingProject: true,
  moreLoading: false,
  isListEnd: false,
  projectList: [],

  loadingProjectTask: true,
  moreLoadingProjectTask: false,
  isListEndProjectTask: false,
  projectTaskList: [],

  loadingProduct: true,
  moreLoadingProduct: false,
  isListEndProduct: false,
  productList: [],
};

const projectSlice = createSlice({
  name: 'hr_project',
  initialState,
  reducers: {
    updateProject: (state, action) => {
      state.project = action.payload;
    },
  },
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchProject, {
      loading: 'loadingProject',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'projectList',
    });
    generateInifiniteScrollCases(builder, searchProjectTask, {
      loading: 'loadingProjectTask',
      moreLoading: 'moreLoadingProjectTask',
      isListEnd: 'isListEndProjectTask',
      list: 'projectTaskList',
    });
    generateInifiniteScrollCases(builder, searchProduct, {
      loading: 'loadingProduct',
      moreLoading: 'moreLoadingProduct',
      isListEnd: 'isListEndProduct',
      list: 'productList',
    });
  },
});

export const {updateProject} = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
