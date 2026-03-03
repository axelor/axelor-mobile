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
import {fetchManufacturingQtyIndicator as _fetchManufacturingQtyIndicator} from '../api/product-indicators-api';

export const fetchManufacturingQtyIndicator = createAsyncThunk(
  'manufacturing_productIndicators/fetchManufacturingQtyIndicator',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchManufacturingQtyIndicator,
      data,
      action: 'Manufacturing_SliceAction_FetchManufacturingQtyIndicator',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingManufacturingQty: false,
  moreLoadingManufacturingQty: false,
  isListEndManufacturingQty: false,
  manufacturingQtyList: [],
};

const productIndicatorsSlice = createSlice({
  name: 'manufacturing_productIndicators',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchManufacturingQtyIndicator, {
      loading: 'loadingManufacturingQty',
      moreLoading: 'moreLoadingManufacturingQty',
      isListEnd: 'isListEndManufacturingQty',
      list: 'manufacturingQtyList',
    });
  },
});

export const productIndicatorsReducer = productIndicatorsSlice.reducer;
