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
import {
  createCheckListItem as _createCheckListItem,
  deleteCheckListItem as _deleteCheckListItem,
  searchCheckListItems as _searchCheckListItems,
  updateCheckListItem as _updateCheckListItem,
} from '../api/check-list-api';

export const searchCheckListItems = createAsyncThunk(
  'project_checkList/searchCheckListItems',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCheckListItems,
      data,
      action: 'Project_SliceAction_SearchCheckListItems',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchParentCheckListItems = createAsyncThunk(
  'project_checkList/searchParentCheckListItems',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCheckListItems,
      data: {...data, isBranch: true},
      action: 'Project_SliceAction_SearchParentCheckListItems',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const updateCheckListItem = createAsyncThunk(
  'project_checkList/updateCheckListItem',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateCheckListItem,
      data,
      action: 'Project_SliceAction_UpdateCheckListItem',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const deleteCheckListItem = createAsyncThunk(
  'project_checkList/deleteCheckListItem',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _deleteCheckListItem,
      data,
      action: 'Project_SliceAction_DeleteCheckListItem',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const createCheckListItem = createAsyncThunk(
  'project_checkList/createCheckListItem',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _createCheckListItem,
      data,
      action: 'Project_SliceAction_CreateCheckListItem',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

const initialState = {
  loadingCheckLists: false,
  moreLoadingCheckList: false,
  isListEndCheckList: false,
  checkListItems: [],

  loadingParentCheckLists: false,
  moreLoadingParentCheckList: false,
  isListEndParentCheckList: false,
  parentCheckListItems: [],
};

const checkListSlice = createSlice({
  name: 'project_checkList',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchCheckListItems, {
      loading: 'loadingCheckLists',
      moreLoading: 'moreLoadingCheckList',
      isListEnd: 'isListEndCheckList',
      list: 'checkListItems',
    });
    generateInifiniteScrollCases(builder, searchParentCheckListItems, {
      loading: 'loadingParentCheckLists',
      moreLoading: 'moreLoadingParentCheckList',
      isListEnd: 'isListEndParentCheckList',
      list: 'parentCheckListItems',
    });
  },
});

export const checkListReducer = checkListSlice.reducer;
