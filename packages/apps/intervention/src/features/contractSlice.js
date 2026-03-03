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
import {searchContract as _searchContract} from '../api/contract-api';

export const searchContract = createAsyncThunk(
  'intervention_contract/searchContract',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchContract,
      data,
      action: 'Intervention_SliceAction_SearchContract',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  contractList: [],
};

const contractSlice = createSlice({
  name: 'intervention_contract',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchContract, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'contractList',
    });
  },
});

export const contractReducer = contractSlice.reducer;
