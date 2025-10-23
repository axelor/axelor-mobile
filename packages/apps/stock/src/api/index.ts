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

export {searchAlternativeBarcode as searchAlternativeBarcodeApi} from './alternative-barcode-api';
export {
  addLineStockMove as addCustomerDeliveryLine,
  fetchCustomerDelivery as fetchCustomerDeliveryApi,
  searchDeliveryFilter as searchDeliveryFilterApi,
  realizeSockMove as realizeCustomerDeliveryApi,
  updateCustomerDeliveryNote as updateCustomerDeliveryNoteApi,
} from './customer-delivery-api';
export {
  fetchCustomerDeliveryLine as fetchCustomerDeliveryLineApi,
  searchCustomerDeliveryLines as searchCustomerDeliveryLinesApi,
  splitCustomerDeliveryLine as splitCustomerDeliveryLineApi,
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
export {
  addStockMoveToLogisticalForm as addStockMoveToLogisticalFormApi,
  createLogisticalForm as createLogisticalFormApi,
  fetchLogisticalForm as fetchLogisticalFormApi,
  removeStockMoveFromLogisticalForm as removeStockMoveFromLogisticalFormApi,
  searchLogisticalForms as searchLogisticalFormsApi,
  updateLogisticalForm as updateLogisticalFormApi,
} from './logistical-form-api';
export {
  createPackaging as createPackagingApi,
  deletePackaging as deletePackagingApi,
  searchPackaging as searchPackagingApi,
  updatePackaging as updatePackagingApi,
} from './packaging-api';
export {
  createPackagingLine as createPackagingLineApi,
  deletePackagingLine as deletePackagingLineApi,
  searchPackagingLines as searchPackagingLinesApi,
  searchPackagingBranch as searchPackagingBranchApi,
  updatePackagingLine as updatePackagingLineApi,
} from './packaging-line-api';
export {fetchPackagingProducts as fetchPackagingProductsApi} from './packaging-product-api';
export {
  searchClientsFilter,
  searchSuppliersFilter,
  searchCarriersFilter,
} from './partner-api';
export {
  fetchProductCompanyWithId as fetchProductCompanyWithIdApi,
  fetchVariantAttributes as fetchVariantAttributesApi,
  fetchVariants as fetchVariantsApi,
  getProductStockIndicators as getProductStockIndicatorsApi,
  searchProductWithId as searchProductWithIdApi,
  searchProductsFilter as searchProductsFilterApi,
  updateLocker as updateLockerApi,
} from './product-api';
export {
  fetchAvailableStockIndicator as fetchAvailableStockIndicatorApi,
  fetchPurchaseOrderQtyIndicator as fetchPurchaseOrderQtyIndicatorApi,
  fetchSaleOrderQtyIndicator as fetchSaleOrderQtyIndicatorApi,
  fetchStockQtyIndicator as fetchStockQtyIndicatorApi,
} from './product-indicators-api';
export {
  createStockCorrection as createStockCorrectionApi,
  fetchStockCorrection as fetchStockCorrectionApi,
  searchStockCorrection as searchStockCorrectionApi,
  updateStockCorrection as updateStockCorrectionApi,
  updateStockCorrectionTrackingNumber as updateStockCorrectionTrackingNumberApi,
} from './stock-correction-api';
export {searchStockCorrectionReason as searchStockCorrectionReasonApi} from './stock-correction-reason-api';
export {searchStockLocationsFilter as searchStockLocationsFilterApi} from './stock-location-api';
export {searchStockMove as searchStockMoveApi} from './stock-move-api';
export {
  searchAvailableProducts as searchAvailableProductsApi,
  searchStockLocationLine as searchStockLocationLineApi,
} from './stock-location-line-api';
export {
  checkQuantity as checkQuantityApi,
  searchStockMoveLine as searchStockMoveLineApi,
  updateStockMoveLine as updateStockMoveLineApi,
} from './stock-move-line-api';
export {
  addLineStockMove as addSupplierArrivalLine,
  fetchSupplierArrival as fetchSupplierArrivalApi,
  realizeSockMove as realizeSupplierArrivalApi,
  searchSupplierArrivalFilter as searchSupplierArrivalFilterApi,
} from './supplier-arrival-api';
export {
  fetchSupplierArrivalLine as fetchSupplierArrivalLineApi,
  searchSupplierArrivalLines as searchSupplierArrivalLinesApi,
  splitSupplierArrivalLine as splitSupplierArrivalLineApi,
  updateLine as updateSupplierArrivalLineApi,
} from './supplier-arrival-line-api';
export {searchSupplierProduct as searchSupplierProductApi} from './supplier-catalog-api';
export {
  createTrackingNumber as createTrackingNumberApi,
  searchTrackingNumberFilter as searchTrackingNumberFilterApi,
  updateStockMoveLineTrackingNumber as updateStockMoveLineTrackingNumberApi,
  updateTrackingNumber as updateTrackingNumberApi,
} from './tracking-number-api';
export {searchUnit as searchUnitApi} from './unit-api';
