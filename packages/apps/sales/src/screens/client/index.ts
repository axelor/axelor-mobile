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

import ClientSaleListScreen from './ClientSaleListScreen';
import ClientSaleDetailsScreen from './ClientSaleDetailsScreen';

export default {
  ClientSaleListScreen: {
    title: 'Sales_Clients',
    component: ClientSaleListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  ClientSaleDetailsScreen: {
    title: 'Sales_Client',
    actionID: 'sales_client_details',
    component: ClientSaleDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {ClientSaleListScreen};
export {ClientSaleDetailsScreen};
