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

import ChildrenManufOrderListScreen from './ChildrenManufOrderListScreen';
import ConsumedProductDetailsScreen from './ConsumedProductDetailsScreen';
import ConsumedProductListScreen from './ConsumedProductListScreen';
import ConsumedProductSelectProductScreen from './ConsumedProductSelectProductScreen';
import ConsumedProductSelectTrackingScreen from './ConsumedProductSelectTrackingScreen';

export default {
  ConsumedProductListScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ConsumedProductListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ConsumedProductDetailsScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ConsumedProductDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ConsumedProductSelectProductScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ConsumedProductSelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
  ConsumedProductSelectTrackingScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ConsumedProductSelectTrackingScreen,
    options: {
      shadedHeader: false,
    },
  },
  ChildrenManufOrderListScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ChildrenManufOrderListScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {ChildrenManufOrderListScreen};
export {ConsumedProductDetailsScreen};
export {ConsumedProductListScreen};
export {ConsumedProductSelectProductScreen};
export {ConsumedProductSelectTrackingScreen};
