/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import SaleQuotationsScreen from './SaleQuotationsScreen';
import SaleOrdersScreen from './SaleOrdersScreen';
import SaleOrderDetailsScreen from './SaleOrderDetailsScreen';
import SaleOrderLineListScreen from './SaleOrderLineListScreen';

export default {
  SaleQuotationsScreen: {
    title: 'Sales_SaleQuotations',
    component: SaleQuotationsScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  SaleOrdersScreen: {
    title: 'Sales_SaleOrders',
    component: SaleOrdersScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  SaleOrderDetailsScreen: {
    title: 'Sales_SaleQuotation',
    actionID: 'sales_saleOrder_details',
    component: SaleOrderDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  SaleOrderLineListScreen: {
    title: 'Sales_SaleQuotation',
    actionID: 'sales_saleOrder_details',
    component: SaleOrderLineListScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {SaleQuotationsScreen};
export {SaleOrdersScreen};
export {SaleOrderDetailsScreen};
export {SaleOrderLineListScreen};
