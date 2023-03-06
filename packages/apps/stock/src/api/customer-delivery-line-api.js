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

import {axiosApiProvider, createStandardSearch} from '@axelor/aos-mobile-core';

export async function searchCustomerDeliveryLines({
  page = 0,
  customerDeliveryId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    criteria: [
      {
        fieldName: 'stockMove.id',
        operator: '=',
        value: customerDeliveryId,
      },
    ],
    fieldKey: 'stock_customerDeliveryLine',
    page,
  });
}

export async function updateLine({stockMoveLineId, version, realQty}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-move-line/${stockMoveLineId}`,
    data: {
      version: version,
      realQty: realQty,
    },
  });
}
