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
import {handlerApiCall} from '../../apiProviders/utils';
import {getLoggedUser, postUser} from '../api/user-api';

export const fetchActiveUser = createAsyncThunk(
  'user/fetchActiveUser',
  async function (userId, {getState}) {
    return handlerApiCall({
      fetchFunction: getLoggedUser,
      data: userId,
      action: 'Auth_SliceAction_FetchActiveUser',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateActiveUser = createAsyncThunk(
  'user/updateActiveUser',
  async function (user, {getState}) {
    return handlerApiCall({
      fetchFunction: postUser,
      data: user,
      action: 'Auth_SliceAction_UpdateActiveUser',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() =>
      handlerApiCall({
        fetchFunction: getLoggedUser,
        data: user.id,
        action: 'Auth_SliceAction_FetchActiveUser',
        getState,
        responseOptions: {isArrayResponse: false},
      }),
    );
  },
);

const initialState = {
  loadingUser: true,
  user: {},
  isUser: false,
  canModifyCompany: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeDefaultStockLocation: (state, action) => {
      state.user = {
        ...state.user,
        workshopStockLocation: action.payload.newStockLocation,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchActiveUser.pending, state => {
      state.loadingUser = true;
    });
    builder.addCase(fetchActiveUser.fulfilled, (state, action) => {
      state.loadingUser = false;
      state.user = action.payload ?? {};
      state.isUser = action.payload != null;
      state.canModifyCompany = action.payload?.companySet?.length > 1;
    });
    builder.addCase(fetchActiveUser.rejected, (state, action) => {
      state.loadingUser = false;
      state.isUser = false;
    });
    builder.addCase(updateActiveUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.canModifyCompany = action.payload?.companySet?.length > 1;
    });
  },
});

export const {changeDefaultStockLocation} = userSlice.actions;

export const userReducer = userSlice.reducer;
