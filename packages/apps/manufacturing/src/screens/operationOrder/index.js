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

import OperationOrderDetailsScreen from './OperationOrderDetailsScreen';
import OperationOrderListScreen from './OperationOrderListScreen';
import OperationOrderPlanningScreen from './OperationOrderPlanningScreen';
import ProductionFileScreen from './ProductionFileScreen';
import {
  ConsumedProductDetailsScreen,
  ConsumedProductListScreen,
  ConsumedProductSelectProductScreen,
  ConsumedProductSelectTrackingScreen,
} from '../manufactoringOrder/consumedProduct';

export default {
  OperationOrderListScreen: {
    title: 'Manufacturing_OperationOrder',
    component: OperationOrderListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
    actionID: 'manufacturing_operationOrder_list',
  },
  OperationOrderDetailsScreen: {
    title: 'Manufacturing_OperationOrder',
    component: OperationOrderDetailsScreen,
    actionID: 'manufacturing_operationOrder_details',
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderConsumedProductListScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ConsumedProductListScreen,
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderConsumedProductDetailsScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ConsumedProductDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderConsumedProductSelectProductScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ConsumedProductSelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderConsumedProductSelectTrackingScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ConsumedProductSelectTrackingScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProductionFileScreen: {
    title: 'Manufacturing_ProductionFile',
    component: ProductionFileScreen,
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderPlanningScreen: {
    title: 'Manufacturing_OperationOrder',
    component: OperationOrderPlanningScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
};

export {OperationOrderDetailsScreen};
export {OperationOrderListScreen};
export {OperationOrderPlanningScreen};
export {ProductionFileScreen};
export {ConsumedProductDetailsScreen};
export {ConsumedProductListScreen};
export {ConsumedProductSelectProductScreen};
export {ConsumedProductSelectTrackingScreen};
