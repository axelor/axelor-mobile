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

import {createStandardSearch} from '@axelor/aos-mobile-core';
import {searchProductsFilter} from './product-api';
import {searchTrackingNumberFilter} from './tracking-number-api';

export async function searchInternalMoveLines({internalMoveId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    criteria: [
      {
        fieldName: 'stockMove.id',
        operator: '=',
        value: internalMoveId,
      },
    ],
    fieldKey: 'stock_internalMoveLine',
    page,
  });
}

export async function searchProductTrackingNumber({searchValue}) {
  const productResult = await searchProductsFilter({searchValue}).then(
    res => res?.data?.data || [],
  );

  const trackingNumberResult = await searchTrackingNumberFilter({
    searchValue,
  }).then(res => res?.data?.data || []);

  return new Promise(async resolve => {
    resolve({data: {data: [...productResult, ...trackingNumberResult]}});
  });
}
