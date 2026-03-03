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

import ManufacturingOrderDetailsScreen from './ManufacturingOrderDetailsScreen';
import ManufacturingOrderListSaleOrderScreen from './ManufacturingOrderListSaleOrderScreen';
import ManufacturingOrderListScreen from './ManufacturingOrderListScreen';
import ManufacturingOrderOperationListScreen from './ManufacturingOrderOperationListScreen';
import ConsumedProductScreens from './consumedProduct';
import ProducedProductScreens from './producedProduct';
import WasteProductScreens from './wasteProduct';
import ManufacturingOrderListProductionOrderScreen from './ManufacturingOrderListProductionOrderScreen';

export default {
  ManufacturingOrderListScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ManufacturingOrderListScreen,
    options: {
      shadedHeader: false,
    },
    actionID: 'manufacturing_manufacturingOrder_list',
    isUsableOnShortcut: true,
  },
  ManufacturingOrderDetailsScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ManufacturingOrderDetailsScreen,
    actionID: 'manufacturing_manufacturingOrder_details',
    options: {
      shadedHeader: false,
    },
  },
  ManufacturingOrderListSaleOrderScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ManufacturingOrderListSaleOrderScreen,
    options: {
      shadedHeader: false,
    },
  },
  ManufacturingOrderOperationListScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ManufacturingOrderOperationListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ManufacturingOrderListProductionOrderScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ManufacturingOrderListProductionOrderScreen,
    options: {
      shadedHeader: false,
    },
  },
  ...ConsumedProductScreens,
  ...ProducedProductScreens,
  ...WasteProductScreens,
};

export {ManufacturingOrderDetailsScreen};
export {ManufacturingOrderListSaleOrderScreen};
export {ManufacturingOrderListScreen};
export {ManufacturingOrderOperationListScreen};
export {ManufacturingOrderListProductionOrderScreen};
