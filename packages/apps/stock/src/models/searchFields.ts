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

import {SearchFields} from '@axelor/aos-mobile-core';

export const stock_searchFields: SearchFields = {
  stock_customerDelivery: ['stockMoveSeq', 'saleOrderSet.externalReference'],
  stock_customerDeliveryLine: [
    'product.fullName',
    'product.serialNumber',
    'trackingNumber.trackingNumberSeq',
    'trackingNumber.serialNumber',
  ],
  stock_internalMove: ['stockMoveSeq'],
  stock_internalMoveLine: [
    'product.fullName',
    'product.serialNumber',
    'trackingNumber.trackingNumberSeq',
    'trackingNumber.serialNumber',
  ],
  stock_inventory: ['inventorySeq'],
  stock_inventoryLine: [
    'product.fullName',
    'product.serialNumber',
    'trackingNumber.trackingNumberSeq',
    'trackingNumber.serialNumber',
  ],
  stock_inventoryLineMassScan: ['product.serialNumber'],
  stock_logisticalForm: ['deliveryNumberSeq'],
  stock_partner: [
    'fullName',
    'partnerSeq',
    'name',
    'firstName',
    'simpleFullName',
  ],
  stock_product: ['name', 'code', 'serialNumber'],
  stock_stockLocation: ['name', 'serialNumber'],
  stock_stockLocationLine: [
    'product.fullName',
    'product.serialNumber',
    'trackingNumber.trackingNumberSeq',
    'trackingNumber.serialNumber',
  ],
  stock_supplierArrival: ['stockMoveSeq', 'purchaseOrderSet.externalReference'],
  stock_supplierArrivalLine: [
    'product.fullName',
    'product.serialNumber',
    'trackingNumber.trackingNumberSeq',
    'trackingNumber.serialNumber',
  ],
  stock_trackingNumber: ['trackingNumberSeq', 'serialNumber', 'origin'],
  stock_alternativeBarcode: ['serialNumber'],
  stock_massStockMoveLine: [
    'product.serialNumber',
    'trackingNumber.serialNumber',
  ],
};
