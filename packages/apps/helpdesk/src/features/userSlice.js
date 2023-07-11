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
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {searchUser as _searchUser} from '../api/user-api';

export const searchUser = createAsyncThunk(
  'user/searchUser',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchUser,
      data,
      action: 'Helpdesk_SliceAction_SearchUser',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingUser: true,
  userList: [],
  moreLoading: false,
  isListEnd: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchUser, {
      loading: 'loadingUser',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'userList',
    });
  },
});

export const userListReducer = userSlice.reducer;
