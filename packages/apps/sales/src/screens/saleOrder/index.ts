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

import SaleQuotations from './SaleQuotations';
import SaleOrders from './SaleOrders';
import SaleOrderDetailsScreen from './SaleOrderDetailsScreen';

export default {
  SaleQuotations: {
    title: 'Sales_SaleQuotations',
    component: SaleQuotations,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  SaleOrders: {
    title: 'Sales_SaleOrders',
    component: SaleOrders,
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
};

export {SaleQuotations};
export {SaleOrders};
export {SaleOrderDetailsScreen};
