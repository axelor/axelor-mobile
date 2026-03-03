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

import ProducedProductDetailsScreen from './ProducedProductDetailsScreen';
import ProducedProductListScreen from './ProducedProductListScreen';
import ProducedProductSelectProductScreen from './ProducedProductSelectProductScreen';
import ProducedProductSelectTrackingScreen from './ProducedProductSelectTrackingScreen';

export default {
  ProducedProductListScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ProducedProductListScreen,
    actionID: 'manufacturing_producedProduct_list',
    options: {
      shadedHeader: false,
    },
  },
  ProducedProductDetailsScreen: {
    title: 'Manufacturing_ProducedProduct',
    component: ProducedProductDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProducedProductSelectProductScreen: {
    title: 'Manufacturing_ProducedProduct',
    component: ProducedProductSelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProducedProductSelectTrackingScreen: {
    title: 'Manufacturing_ProducedProduct',
    component: ProducedProductSelectTrackingScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {ProducedProductDetailsScreen};
export {ProducedProductListScreen};
export {ProducedProductSelectProductScreen};
export {ProducedProductSelectTrackingScreen};
