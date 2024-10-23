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

export {
  addLineStockMove as addCustomerDeliveryLine,
  searchDeliveryFilter,
  realizeSockMove as realizeCustomerDeliveryApi,
} from './customer-delivery-api';
export {
  searchCustomerDeliveryLines,
  updateLine as updateCustomerDeliveryLineApi,
} from './customer-delivery-line-api';
export {
  fetchInternalMove as fetchInternalMoveApi,
  searchInternalMoveFilter,
  realizeInternalMove as realizeInternalMoveApi,
  createInternalStockMove,
} from './internal-move-api';
export {
  searchInternalMoveLines,
  updateInternalMoveLine as updateInternalMoveLineApi,
} from './internal-move-line-api';
export * from './inventory-api';
export * from './inventory-line-api';
export * from './partner-api';
export * from './product-api';
export {
  fetchStockCorrection as fetchStockCorrectionApi,
  createStockCorrection,
  updateStockCorrection,
  searchStockCorrection,
  updateStockCorrectionTrackingNumber,
} from './stock-correction-api';
export * from './stock-correction-reason-api';
export * from './stock-location-api';
export * from './stock-location-line-api';
export {
  searchSupplierArrivalFilter,
  addLineStockMove as addSupplierArrivalLine,
  realizeSockMove as realizeSupplierArrivalApi,
} from './supplier-arrival-api';
export {
  searchSupplierArrivalLines,
  updateLine as updateSupplierArrivalLineApi,
} from './supplier-arrival-line-api';
export * from './supplier-catalog-api';
export * from './supplychain-config-api';
export * from './tracking-number-api';
export * from './unit-api';
