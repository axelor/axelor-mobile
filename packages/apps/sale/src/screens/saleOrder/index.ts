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

import SaleQuotationsScreen from './SaleQuotationsScreen';
import SaleOrdersScreen from './SaleOrdersScreen';
import SaleOrderDetailsScreen from './SaleOrderDetailsScreen';
import SaleOrderLineListScreen from './SaleOrderLineListScreen';
import SaleOrderLineDetailsScreen from './SaleOrderLineDetailsScreen';
import SaleQuotationCreationScreen from './SaleQuotationCreationScreen';

export default {
  SaleQuotationsScreen: {
    title: 'Sale_SaleQuotations',
    actionID: 'sale_saleQuotation_list',
    component: SaleQuotationsScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  SaleOrdersScreen: {
    title: 'Sale_SaleOrders',
    actionID: 'sale_saleOrder_list',
    component: SaleOrdersScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  SaleOrderDetailsScreen: {
    title: 'Sale_SaleQuotation',
    actionID: 'sale_saleOrder_details',
    component: SaleOrderDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  SaleOrderLineListScreen: {
    title: 'Sale_SaleQuotation',
    actionID: 'sale_saleOrder_details',
    component: SaleOrderLineListScreen,
    options: {
      shadedHeader: false,
    },
  },
  SaleOrderLineDetailsScreen: {
    title: 'Sale_SaleQuotation',
    actionID: 'sale_saleOrderLine_details',
    component: SaleOrderLineDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  SaleQuotationCreationScreen: {
    title: 'Sale_SaleQuotation',
    component: SaleQuotationCreationScreen,
  },
};

export {SaleQuotationsScreen};
export {SaleOrdersScreen};
export {SaleOrderDetailsScreen};
export {SaleOrderLineListScreen};
export {SaleOrderLineDetailsScreen};
export {SaleQuotationCreationScreen};
