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

import SupplierArrivalAddTrackingScreen from './SupplierArrivalAddTrackingScreen';
import SupplierArrivalDetailsScreen from './SupplierArrivalDetailsScreen';
import SupplierArrivalLineCreationScreen from './SupplierArrivalLineCreationScreen';
import SupplierArrivalLineDetailScreen from './SupplierArrivalLineDetailScreen';
import SupplierArrivalLineListScreen from './SupplierArrivalLineListScreen';
import SupplierArrivalListScreen from './SupplierArrivalListScreen';
import SupplierArrivalSelectProductScreen from './SupplierArrivalSelectProductScreen';
import SupplierArrivalSelectTrackingScreen from './SupplierArrivalSelectTrackingScreen';

export default {
  SupplierArrivalListScreen: {
    title: 'Stock_SupplierArrival',
    component: SupplierArrivalListScreen,
    isUsableOnShortcut: true,
    actionID: 'stock_supplierArrival_list',
  },
  SupplierArrivalDetailsScreen: {
    title: 'Stock_SupplierArrival',
    component: SupplierArrivalDetailsScreen,
    actionID: 'stock_supplierArrival_details',
  },
  SupplierArrivalLineDetailScreen: {
    title: 'Stock_SupplierArrival',
    component: SupplierArrivalLineDetailScreen,
    actionID: 'stock_supplierArrival_lineDetails',
  },
  SupplierArrivalLineCreationScreen: {
    title: 'Stock_SupplierArrival',
    component: SupplierArrivalLineCreationScreen,
  },
  SupplierArrivalLineListScreen: {
    title: 'Stock_SupplierArrival',
    component: SupplierArrivalLineListScreen,
    actionID: 'stock_supplierArrival_lineList',
  },
  SupplierArrivalSelectProductScreen: {
    title: 'Stock_SupplierArrival',
    component: SupplierArrivalSelectProductScreen,
  },
  SupplierArrivalSelectTrackingScreen: {
    title: 'Stock_SupplierArrival',
    component: SupplierArrivalSelectTrackingScreen,
  },
  SupplierArrivalAddTrackingScreen: {
    title: 'Stock_SupplierArrival',
    component: SupplierArrivalAddTrackingScreen,
  },
};

export {SupplierArrivalAddTrackingScreen};
export {SupplierArrivalDetailsScreen};
export {SupplierArrivalLineCreationScreen};
export {SupplierArrivalLineDetailScreen};
export {SupplierArrivalLineListScreen};
export {SupplierArrivalListScreen};
export {SupplierArrivalSelectProductScreen};
export {SupplierArrivalSelectTrackingScreen};
