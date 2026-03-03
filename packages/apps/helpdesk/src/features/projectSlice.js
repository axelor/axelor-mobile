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
import {searchProject as _searchProject} from '../api/project-api';

export const searchProject = createAsyncThunk(
  'helpdesk_project/searchProject',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProject,
      data,
      action: 'Helpdesk_SliceAction_FetchProjects',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingProject: true,
  moreLoading: false,
  isListEnd: false,
  projectList: [],
};

const projectSlice = createSlice({
  name: 'helpdesk_project',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchProject, {
      loading: 'loadingProject',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'projectList',
    });
  },
});

export const projectReducer = projectSlice.reducer;
