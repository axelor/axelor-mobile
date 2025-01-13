/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {searchAddress as _searchAddress} from '../api/address-api';

export const searchAddress = createAsyncThunk(
  'crm_address/searchAddress',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchAddress,
      data,
      action: 'Crm_SliceAction_SearchAddress',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingAddresss: false,
  moreLoadingAddress: false,
  isListEndAddress: false,
  addressList: [],
};

const addressSlice = createSlice({
  name: 'crm_address',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchAddress, {
      loading: 'loadingAddresss',
      moreLoading: 'moreLoadingAddress',
      isListEnd: 'isListEndAddress',
      list: 'addressList',
    });
  },
});

export const addressReducer = addressSlice.reducer;
