/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

export {searchMachines} from './machinesSlice';
export {
  fetchChildrenOfManufacturingOrder,
  fetchLinkedManufOrders,
  fetchManufacturingOrders,
  fetchManufOrder,
  updateStatusOfManufOrder,
} from './manufacturingOrderSlice';
export {
  fetchOperationOrderById,
  fetchOperationOrders,
  fetchPlannedOperationOrder,
  updateOperationOrder,
} from './operationOrderSlice';
export {
  addProdProductToManufOrder,
  addTrackingNumberToConsumedProduct,
  fetchConsumedProducts,
  fetchConsumedProductWithId,
  fetchProdProductWithId,
  fetchProducedProducts,
  fetchProducedProductWithId,
  updateProdProductOfManufOrder,
} from './prodProductSlice';
export {fetchManufacturingQtyIndicator} from './productIndicatorsSlice';
export {fetchProductionFile} from './productionFileSlice';
export {
  addWasteProductToManufOrder,
  declareWasteProductsOfManufOrder,
  fetchWasteProducts,
  updateWasteProductOfManufOrder,
} from './wasteProductsSlice';
export {searchWorkCenters} from './workCentersSlice';
