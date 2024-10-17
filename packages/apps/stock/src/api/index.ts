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
  fetchCustomerDelivery as fetchCustomerDeliveryApi,
  realizeSockMove as realizeCustomerDeliveryApi,
  searchDeliveryFilter,
} from './customer-delivery-api';
export {
  searchCustomerDeliveryLines,
  updateLine as updateCustomerDeliveryLineApi,
  fetchCustomerDeliveryLine as fetchCustomerDeliveryLineApi,
} from './customer-delivery-line-api';
export {
  createInternalStockMove,
  fetchInternalMove as fetchInternalMoveApi,
  modifyInternalMoveNotes,
  realizeInternalMove as realizeInternalMoveApi,
  searchInternalMoveFilter,
} from './internal-move-api';
export {
  fetchInternalMoveLine as fetchInternalMoveLineApi,
  searchInternalMoveLines,
  updateInternalMoveLine as updateInternalMoveLineApi,
} from './internal-move-line-api';
export * from './inventory-api';
export {
  addTrackingNumber,
  createInventoryLine,
  fetchInventoryLine as fetchInventoryLineApi,
  searchInventoryLines,
  updateInventoryLineDetails,
} from './inventory-line-api';
export * from './partner-api';
export * from './product-api';
export {
  createStockCorrection,
  fetchStockCorrection as fetchStockCorrectionApi,
  searchStockCorrection,
  updateStockCorrection,
  updateStockCorrectionTrackingNumber,
} from './stock-correction-api';
export * from './stock-correction-reason-api';
export * from './stock-location-api';
export {
  searchAvailableProducts as searchAvailableProductsApi,
  searchStockLocationLine,
} from './stock-location-line-api';
export {
  addLineStockMove as addSupplierArrivalLine,
  fetchSupplierArrival as fetchSupplierArrivalApi,
  realizeSockMove as realizeSupplierArrivalApi,
  searchSupplierArrivalFilter,
} from './supplier-arrival-api';
export {
  fetchSupplierArrivalLine as fetchSupplierArrivalLineApi,
  searchSupplierArrivalLines,
  updateLine as updateSupplierArrivalLineApi,
} from './supplier-arrival-line-api';
export * from './supplier-catalog-api';
export * from './tracking-number-api';
export * from './unit-api';
