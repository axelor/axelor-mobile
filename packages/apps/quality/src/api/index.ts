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
  fetchControlEntryById as fetchControlEntryByIdApi,
  searchControlEntry as searchControlEntryApi,
  updateControlEntry as updateControlEntryApi,
  getProgressValues as getProgressValuesApi,
} from './control-entry-api';
export {searchControlEntrySample as searchControlEntrySampleApi} from './control-entry-sample-api';
export {
  checkComformity,
  fetchControlEntrySampleLine as fetchControlEntrySampleLineApi,
  searchControlEntrySampleLine as searchControlEntrySampleLineApi,
  searchControlEntrySampleLineOfControlEntry as searchControlEntrySampleLineOfControlEntryApi,
} from './control-entry-sample-line-api';
export {fetchControlPlanById as fetchControlPlanByIdApi} from './control-plan-api';
export {
  fetchManufOrder as fetchManufOrderApi,
  searchBoMLines as searchBoMLinesApi,
  searchManufOrder as searchManufOrderApi,
} from './manuf-order-api';
export {
  fetchOperationOrder as fetchOperationOrderApi,
  searchOperationLine as searchOperationLineApi,
} from './operation-order-api';
export {
  searchCustomer as searchCustomerApi,
  searchSupplier as searchSupplierApi,
} from './partner-api';
export {searchProduct as searchProductApi} from './product-api';
export {searchSupplierOrder as searchSupplierOrderApi} from './purchase-order-api';
export {searchSupplierPurchaseOrderLine as searchSupplierPurchaseOrderLineApi} from './purchase-order-line-api';
export {searchQIAnalysisMethod as searchQIAnalysisMethodApi} from './qi-analysis-method-api';
export {
  fetchQIDetection as fetchQIDetectionApi,
  searchQIDetection as searchQIDetectionApi,
} from './qi-detection-api';
export {searchDefect as searchDefectApi} from './qi-default-api';
export {
  createQualityImprovement as createQualityImprovementApi,
  fetchQiResolution as fetchQiResolutionApi,
  fetchQualityImprovement as fetchQualityImprovementApi,
  fetchQualityImprovementStatus as fetchQualityImprovementStatusApi,
  searchQualityImprovement as searchQualityImprovementApi,
  updateQualityImprovement as updateQualityImprovementApi,
} from './quality-improvement-api';
export {searchCustomerOrder as searchCustomerOrderApi} from './sale-order-api';
export {searchCustomerOrderLine as searchCustomerOrderLineApi} from './sale-order-line-api';
export {
  fetchStockMove as fetchStockMoveApi,
  fetchStockMoveLine as fetchStockMoveLineApi,
} from './stock-move-api';
