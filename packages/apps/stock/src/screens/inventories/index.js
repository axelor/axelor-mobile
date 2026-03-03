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

import InventoryLineDetailsScreen from './InventoryLineDetailsScreen';
import InventoryLineListScreen from './InventoryLineListScreen';
import InventoryListScreen from './InventoryListScreen';
import InventoryPlannedDetailsScreen from './InventoryPlannedDetailsScreen';
import InventorySelectProductScreen from './InventorySelectProductScreen';
import InventorySelectTrackingScreen from './InventorySelectTrackingScreen';
import InventoryStartedDetailsScreen from './InventoryStartedDetailsScreen';

export default {
  InventoryListScreen: {
    title: 'Stock_Inventory',
    component: InventoryListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
    actionID: 'stock_inventory_list',
  },
  InventoryPlannedDetailsScreen: {
    title: 'Stock_Inventory',
    component: InventoryPlannedDetailsScreen,
    actionID: 'stock_inventory_plannedDetails',
    options: {
      shadedHeader: false,
    },
  },
  InventoryStartedDetailsScreen: {
    title: 'Stock_Inventory',
    component: InventoryStartedDetailsScreen,
    actionID: 'stock_inventory_startedDetails',
    options: {
      shadedHeader: false,
    },
  },
  InventoryLineDetailsScreen: {
    title: 'Stock_Inventory',
    component: InventoryLineDetailsScreen,
    actionID: 'stock_inventory_lineDetails',
    options: {
      shadedHeader: false,
    },
  },
  InventoryLineListScreen: {
    title: 'Stock_Inventory',
    component: InventoryLineListScreen,
    options: {
      shadedHeader: false,
    },
  },
  InventorySelectProductScreen: {
    title: 'Stock_Inventory',
    component: InventorySelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
  InventorySelectTrackingScreen: {
    title: 'Stock_Inventory',
    component: InventorySelectTrackingScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {InventoryLineDetailsScreen};
export {InventoryLineListScreen};
export {InventoryListScreen};
export {InventoryPlannedDetailsScreen};
export {InventorySelectProductScreen};
export {InventorySelectTrackingScreen};
export {InventoryStartedDetailsScreen};
