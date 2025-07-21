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
  fetchControlEntrySampleLine,
  searchControlEntrySampleLineOfControlEntry,
} from './controlEntrySampleLineSlice';
export {searchControlEntrySample} from './controlEntrySampleSlice';
export {
  fetchControlEntryById,
  searchControlEntry,
  updateControlEntry,
} from './controlEntrySlice';
export {fetchControlPlanById} from './controlPlanSlice';
export {
  fetchManufOrder,
  searchBoMLines,
  searchManufOrder,
} from './manufOrderSlice';
export {fetchOperationOrder, searchOperationLine} from './operationOrderSlice';
export {searchCustomer, searchSupplier} from './partnerSlice';
export {searchProduct} from './productSlice';
export {searchSupplierPurchaseOrderLine} from './purchaseOrderLineSlice';
export {searchSupplierOrder} from './purchaseOrderSlice';
export {searchQIAnalysisMethod} from './qiAnalysisMethodSlice';
export {fetchQIDetection, searchQIDetection} from './qiDetectionSlice';
export {searchDefect} from './qiDefaultSlice';
export {
  createQualityImprovement,
  fetchQualityImprovement,
  fetchQualityImprovementStatus,
  searchQualityImprovement,
  updateQualityImprovement,
} from './qualityImprovementSlice';
export {searchCustomerOrderLine} from './saleOrderLineSlice';
export {searchCustomerOrder} from './saleOrderSlice';
export {fetchStockMove, fetchStockMoveLine} from './stockMoveSlice';
