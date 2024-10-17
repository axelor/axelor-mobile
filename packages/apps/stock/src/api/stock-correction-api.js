/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import {
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
} from '@axelor/aos-mobile-core';

export async function searchStockCorrection({page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockCorrection',
    criteria: [],
    fieldKey: 'stock_stockCorrection',
    sortKey: 'stock_stockCorrection',
    page,
  });
}

export async function fetchStockCorrection({id}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockCorrection',
    id: id,
    fieldKey: 'stock_stockCorrection',
  });
}

export async function createStockCorrection({
  productId,
  stockLocationId,
  reasonId,
  trackingNumberId,
  status,
  realQty,
}) {
  return axiosApiProvider.post({
    url: 'ws/aos/stock-correction/',
    data: {
      productId: productId,
      stockLocationId: stockLocationId,
      reasonId: reasonId,
      trackingNumberId: trackingNumberId,
      status: status,
      realQty: realQty,
    },
  });
}

export async function updateStockCorrection({
  stockCorrectionId,
  version,
  realQty,
  status,
  reasonId,
}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-correction/${stockCorrectionId}`,
    data: {
      version: version,
      realQty: realQty,
      status: status,
      reasonId: reasonId,
    },
  });
}

export async function updateStockCorrectionTrackingNumber({
  stockCorrectionId,
  stockCorrectionVersion,
  trackingNumber,
}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.stock.db.StockCorrection/${stockCorrectionId}`,
    data: {
      data: {
        id: stockCorrectionId,
        version: stockCorrectionVersion,
        trackingNumber: trackingNumber,
      },
    },
  });
}
