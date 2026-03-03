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

import InternalMoveCreationScreen from './InternalMoveCreationScreen';
import InternalMoveDetailsGeneralScreen from './InternalMoveDetailsGeneralScreen';
import InternalMoveLineDetailsScreen from './InternalMoveLineDetailsScreen';
import InternalMoveLineListScreen from './InternalMoveLineListScreen';
import InternalMoveListScreen from './InternalMoveListScreen';
import InternalMoveSelectProductScreen from './InternalMoveSelectProductScreen';
import InternalMoveSelectTrackingScreen from './InternalMoveSelectTrackingScreen';

export default {
  InternalMoveListScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveListScreen,
    actionID: 'stock_internalMove_list',
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  InternalMoveDetailsGeneralScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveDetailsGeneralScreen,
    actionID: 'stock_internalMove_details',
    options: {
      shadedHeader: false,
    },
  },
  InternalMoveCreationScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveCreationScreen,
    isUsableOnShortcut: true,
  },
  InternalMoveLineDetailsScreen: {
    actionID: 'stock_internalMove_lineDetails',
    title: 'Stock_InternalMove',
    component: InternalMoveLineDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  InternalMoveLineListScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveLineListScreen,
    options: {
      shadedHeader: false,
    },
  },
  InternalMoveSelectProductScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveSelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
  InternalMoveSelectTrackingScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveSelectTrackingScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {InternalMoveCreationScreen};
export {InternalMoveDetailsGeneralScreen};
export {InternalMoveLineDetailsScreen};
export {InternalMoveLineListScreen};
export {InternalMoveListScreen};
export {InternalMoveSelectProductScreen};
export {InternalMoveSelectTrackingScreen};
