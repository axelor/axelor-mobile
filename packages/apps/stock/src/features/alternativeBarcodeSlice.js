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
import {searchAlternativeBarcode as _searchAlternativeBarcode} from '../api/alternative-barcode-api';

export const searchAlternativeBarcode = createAsyncThunk(
  'stock_alternativeBarcode/searchAlternativeBarcode',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchAlternativeBarcode,
      data,
      action: 'Stock_SliceAction_SearchAlternativeBarcode',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingAlternativeBarcodes: false,
  moreLoadingAlternativeBarcode: false,
  isListEndAlternativeBarcode: false,
  alternativeBarcodeList: [],
};

const alternativeBarcodeSlice = createSlice({
  name: 'stock_alternativeBarcode',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchAlternativeBarcode, {
      loading: 'loadingAlternativeBarcodes',
      moreLoading: 'moreLoadingAlternativeBarcode',
      isListEnd: 'isListEndAlternativeBarcode',
      list: 'alternativeBarcodeList',
    });
  },
});

export const alternativeBarcodeReducer = alternativeBarcodeSlice.reducer;
