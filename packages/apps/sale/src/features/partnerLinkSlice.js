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
import {searchDeliveryPartnerLinks as _searchDeliveryPartnerLinks} from '../api/partner-link-api';

export const searchDeliveryPartnerLinks = createAsyncThunk(
  'sale_partnerLink/searchDeliveryPartnerLinks',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchDeliveryPartnerLinks,
      data,
      action: 'Sale_SliceAction_SearchDeliveryPartnerLinks',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingLinks: false,
  moreLoadingLinks: false,
  isLinksListEnd: false,
  deliveryPartnerLinkList: [],
};

const partnerLinkSlice = createSlice({
  name: 'sale_partnerLink',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchDeliveryPartnerLinks, {
      loading: 'loadingLinks',
      moreLoading: 'moreLoadingLinks',
      isListEnd: 'isLinksListEnd',
      list: 'deliveryPartnerLinkList',
    });
  },
});

export const partnerLinkReducer = partnerLinkSlice.reducer;
