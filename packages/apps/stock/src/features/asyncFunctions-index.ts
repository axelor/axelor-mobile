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
  fetchCustomerDeliveryLines,
  updateCustomerDeliveryLine,
} from './customerDeliveryLineSlice';
export {
  addNewLine as addNewCustomerDeliveryLine,
  realizeCustomerDelivery,
  searchDeliveries,
  fetchCustomerDelivery,
} from './customerDeliverySlice';
export {
  fetchInternalMoveLines,
  updateInternalMoveLine,
} from './internalMoveLineSlice';
export {
  searchInternalMoves,
  createInternalMove,
  realizeInternalMove,
  fetchInternalMove,
} from './internalMoveSlice';
export {
  createNewInventoryLine,
  fetchInventoryLines,
  updateInventoryLine,
} from './inventoryLineSlice';
export {
  searchInventories,
  modifyDescription,
  updateInventory,
  fetchInventoryById,
} from './inventorySlice';
export {filterClients, filterSuppliers} from './partnerSlice';
export {
  fetchProductDistribution,
  fetchProductIndicators,
  fetchProductsAvailability,
} from './productIndicatorsSlice';
export {
  searchProducts,
  fetchProductWithId,
  updateProductLocker,
} from './productSlice';
export {
  fetchProductVariants,
  fetchProductsAttributes,
} from './productVariantSlice';
export {getRacks} from './racksListSlice';
export {fetchSupplychainConfigForStockApp} from './stockAppConfigSlice';
export {fetchStockCorrectionReasons} from './stockCorrectionReasonSlice';
export {
  addTrackingNumberStockCorrection,
  searchStockCorrections,
  createCorrection,
  updateCorrection,
  fetchStockCorrection,
} from './stockCorrectionSlice';
export {fetchStockLocationLine} from './stockLocationLineSlice';
export {
  searchStockLocations,
  filterSecondStockLocations,
} from './stockLocationSlice';
export {
  fetchSupplierArrivalLines,
  updateSupplierArrivalLine,
} from './supplierArrivalLineSlice';
export {
  searchSupplierArrivals,
  addNewLine as addNewSupplierArrivalLine,
  realizeSupplierArrival,
  fetchSupplierArrival,
} from './supplierArrivalSlice';
export {fetchProductForSupplier} from './supplierCatalogSlice';
export {
  filterTrackingNumber,
  createTrackingNumberSeq,
  updateSupplierTrackingNumber,
} from './trackingNumberSlice';
export {fetchUnit} from './unitSlice';
