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

export {
  addLineStockMove as addCustomerDeliveryLine,
  fetchCustomerDelivery as fetchCustomerDeliveryApi,
  searchDeliveryFilter as searchDeliveryFilterApi,
  realizeSockMove as realizeCustomerDeliveryApi,
} from './customer-delivery-api';
export {
  fetchCustomerDeliveryLine as fetchCustomerDeliveryLineApi,
  searchCustomerDeliveryLines as searchCustomerDeliveryLinesApi,
  updateLine as updateCustomerDeliveryLineApi,
} from './customer-delivery-line-api';
export {
  createInternalStockMove as createInternalStockMoveApi,
  fetchInternalMove as fetchInternalMoveApi,
  modifyInternalMoveNotes as modifyInternalMoveNotesApi,
  realizeInternalMove as realizeInternalMoveApi,
  searchInternalMoveFilter as searchInternalMoveFilterApi,
} from './internal-move-api';
export {
  fetchInternalMoveLine as fetchInternalMoveLineApi,
  searchInternalMoveLines as searchInternalMoveLinesApi,
  updateInternalMoveLine as updateInternalMoveLineApi,
} from './internal-move-line-api';
export {
  fetchInventory as fetchInventoryApi,
  modifyDescriptionInventory as modifyDescriptionInventoryApi,
  searchInventoryFilter as searchInventoryFilterApi,
  updateInventoryStatus as updateInventoryStatusApi,
} from './inventory-api';
export {
  addTrackingNumber as addTrackingNumberInventoryLineApi,
  createInventoryLine as createInventoryLineApi,
  fetchInventoryLine as fetchInventoryLineApi,
  searchInventoryLines as searchInventoryLinesApi,
  updateInventoryLineDetails as updateInventoryLineDetailsApi,
} from './inventory-line-api';
export {searchClientsFilter, searchSuppliersFilter} from './partner-api';
export {
  fetchVariantAttributes as fetchVariantAttributesApi,
  fetchVariants as fetchVariantsApi,
  getProductStockIndicators as getProductStockIndicatorsApi,
  searchProductWithId as searchProductWithIdApi,
  searchProductsFilter as searchProductsFilterApi,
  updateLocker as updateLockerApi,
} from './product-api';
export {
  fetchStockCorrection as fetchStockCorrectionApi,
  createStockCorrection as createStockCorrectionApi,
  updateStockCorrection as updateStockCorrectionApi,
  searchStockCorrection as searchStockCorrectionApi,
  updateStockCorrectionTrackingNumber as updateStockCorrectionTrackingNumberApi,
} from './stock-correction-api';
export {searchStockCorrectionReason as searchStockCorrectionReasonApi} from './stock-correction-reason-api';
export {searchStockLocationsFilter as searchStockLocationsFilterApi} from './stock-location-api';
export {
  searchAvailableProducts as searchAvailableProductsApi,
  searchStockLocationLine as searchStockLocationLineApi,
} from './stock-location-line-api';
export {
  addLineStockMove as addSupplierArrivalLine,
  fetchSupplierArrival as fetchSupplierArrivalApi,
  realizeSockMove as realizeSupplierArrivalApi,
  searchSupplierArrivalFilter as searchSupplierArrivalFilterApi,
} from './supplier-arrival-api';
export {
  fetchSupplierArrivalLine as fetchSupplierArrivalLineApi,
  searchSupplierArrivalLines as searchSupplierArrivalLinesApi,
  updateLine as updateSupplierArrivalLineApi,
} from './supplier-arrival-line-api';
export {searchSupplierProduct as searchSupplierProductApi} from './supplier-catalog-api';
export {
  fetchStockConfig as fetchStockConfigApi,
  fetchSupplychainConfig as fetchSupplychainConfigApi,
} from './supplychain-config-api';
export {
  createTrackingNumber as createTrackingNumberApi,
  searchTrackingNumberFilter as searchTrackingNumberFilterApi,
  updateStockMoveLineTrackingNumber as updateStockMoveLineTrackingNumberApi,
} from './tracking-number-api';
export {searchUnit as searchUnitApi} from './unit-api';
