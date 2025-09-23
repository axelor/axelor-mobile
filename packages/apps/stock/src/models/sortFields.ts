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

import {SortFields} from '@axelor/aos-mobile-core';

export const stock_sortFields: SortFields = {
  stock_availableProducts: [
    'product.fullName',
    'trackingNumber.trackingNumberSeq',
  ],
  stock_customerDelivery: [
    'statusSelect',
    '-realDate',
    'estimatedDate',
    'stockMoveSeq',
  ],
  stock_customerDeliveryLine: ['sequence'],
  stock_internalMove: [
    'statusSelect',
    '-realDate',
    'estimatedDate',
    'stockMoveSeq',
  ],
  stock_internalMoveLine: ['sequence'],
  stock_inventory: [
    'statusSelect',
    '-validatedOn',
    'plannedStartDateT',
    'inventorySeq',
  ],
  stock_logisticalForm: [
    'statusSelect',
    '-collectionDate',
    'deliveryNumberSeq',
  ],
  stock_product: ['name'],
  stock_stockCorrection: ['statusSelect', '-validationDateT', 'createdOn'],
  stock_supplierArrival: [
    'statusSelect',
    '-realDate',
    'estimatedDate',
    'stockMoveSeq',
  ],
  stock_supplierArrivalLine: ['sequence'],
  stock_trackingNumber: ['trackingNumberSeq'],
};
