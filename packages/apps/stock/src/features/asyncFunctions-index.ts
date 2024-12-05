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
  addTrackingNumber as addTrackingNumberToCustomerDeliveryLine,
  fetchCustomerDeliveryLine,
  fetchCustomerDeliveryLines,
  updateCustomerDeliveryLine,
} from './customerDeliveryLineSlice';
export {
  addNewLine as addNewCustomerDeliveryLine,
  fetchCustomerDelivery,
  realizeCustomerDelivery,
  searchDeliveries,
} from './customerDeliverySlice';
export {
  addTrackingNumber as addTrackingNumberToInternalMoveLine,
  fetchInternalMoveLine,
  fetchInternalMoveLines,
  updateInternalMoveLine,
} from './internalMoveLineSlice';
export {
  createInternalMove,
  fetchInternalMove,
  realizeInternalMove,
  searchInternalMoves,
} from './internalMoveSlice';
export {
  addTrackingNumber as addTrackingNumberToInventoryLine,
  createNewInventoryLine,
  fetchInventoryLine,
  fetchInventoryLines,
  updateInventoryLine,
} from './inventoryLineSlice';
export {
  fetchInventoryById,
  modifyDescription,
  searchInventories,
  updateInventory,
} from './inventorySlice';
export {filterClients, filterSuppliers} from './partnerSlice';
export {
  fetchAvailableStockIndicator,
  fetchProductIndicators,
  fetchPurchaseOrderQtyIndicator,
  fetchSaleOrderQtyIndicator,
  fetchStockQtyIndicator,
} from './productIndicatorsSlice';
export {
  fetchProductWithId,
  searchProducts,
  updateProductLocker,
} from './productSlice';
export {searchProductTrackingNumber} from './productTrackingNumberSlice';
export {fetchProductVariants} from './productVariantSlice';
export {getRacks} from './racksListSlice';
export {fetchStockCorrectionReasons} from './stockCorrectionReasonSlice';
export {
  addTrackingNumberStockCorrection,
  createCorrection,
  fetchStockCorrection,
  searchStockCorrections,
  updateCorrection,
} from './stockCorrectionSlice';
export {
  fetchStockLocationLine,
  searchAvailableProducts,
} from './stockLocationLineSlice';
export {
  searchStockLocations,
  filterSecondStockLocations,
} from './stockLocationSlice';
export {
  fetchSupplierArrivalLine,
  fetchSupplierArrivalLines,
  splitSupplierArrivalLine,
  updateSupplierArrivalLine,
} from './supplierArrivalLineSlice';
export {
  addNewLine as addNewSupplierArrivalLine,
  fetchSupplierArrival,
  realizeSupplierArrival,
  searchSupplierArrivals,
} from './supplierArrivalSlice';
export {fetchProductForSupplier} from './supplierCatalogSlice';
export {
  createTrackingNumberSeq,
  filterTrackingNumber,
  updateSupplierTrackingNumber,
  updateTrackingNumber,
} from './trackingNumberSlice';
export {fetchUnit} from './unitSlice';
