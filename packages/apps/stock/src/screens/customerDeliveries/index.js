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

import CustomerDeliveryDetailScreen from './CustomerDeliveryDetailScreen';
import CustomerDeliveryLineCreationScreen from './CustomerDeliveryLineCreationScreen';
import CustomerDeliveryLineDetailScreen from './CustomerDeliveryLineDetailScreen';
import CustomerDeliveryLineListScreen from './CustomerDeliveryLineListScreen';
import CustomerDeliveryListScreen from './CustomerDeliveryListScreen';
import CustomerDeliverySelectProductScreen from './CustomerDeliverySelectProductScreen';
import CustomerDeliverySelectTrackingScreen from './CustomerDeliverySelectTrackingScreen';

export default {
  CustomerDeliveryListScreen: {
    title: 'Stock_CustomerDelivery',
    actionID: 'stock_customerDelivery_list',
    component: CustomerDeliveryListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  CustomerDeliveryDetailScreen: {
    title: 'Stock_CustomerDelivery',
    component: CustomerDeliveryDetailScreen,
    actionID: 'stock_customerDelivery_details',
    options: {
      shadedHeader: false,
    },
  },
  CustomerDeliveryLineDetailScreen: {
    title: 'Stock_CustomerDelivery',
    component: CustomerDeliveryLineDetailScreen,
    actionID: 'stock_customerDelivery_lineDetails',
    options: {
      shadedHeader: false,
    },
  },
  CustomerDeliveryLineCreationScreen: {
    title: 'Stock_CustomerDelivery',
    component: CustomerDeliveryLineCreationScreen,
    options: {
      shadedHeader: false,
    },
  },
  CustomerDeliveryLineListScreen: {
    title: 'Stock_CustomerDelivery',
    component: CustomerDeliveryLineListScreen,
    actionID: 'stock_customerDelivery_lineList',
    options: {
      shadedHeader: false,
    },
  },
  CustomerDeliverySelectProductScreen: {
    title: 'Stock_CustomerDelivery',
    component: CustomerDeliverySelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
  CustomerDeliverySelectTrackingScreen: {
    title: 'Stock_CustomerDelivery',
    component: CustomerDeliverySelectTrackingScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {CustomerDeliveryDetailScreen};
export {CustomerDeliveryLineCreationScreen};
export {CustomerDeliveryLineDetailScreen};
export {CustomerDeliveryLineListScreen};
export {CustomerDeliveryListScreen};
export {CustomerDeliverySelectProductScreen};
export {CustomerDeliverySelectTrackingScreen};
