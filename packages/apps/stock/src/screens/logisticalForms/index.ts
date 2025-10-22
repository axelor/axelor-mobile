/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import LogisticalFormDetailsScreen from './LogisticalFormDetailsScreen';
import LogisticalFormFormScreen from './LogisticalFormFormScreen';
import LogisticalFormListScreen from './LogisticalFormListScreen';
import LogisticalFormPackagingItemFormScreen from './LogisticalFormPackagingItemFormScreen';

export default {
  LogisticalFormListScreen: {
    title: 'Stock_LogisticalForm',
    component: LogisticalFormListScreen,
    actionID: 'stock_logisticalForm_list',
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  LogisticalFormDetailsScreen: {
    title: 'Stock_LogisticalForm',
    component: LogisticalFormDetailsScreen,
    actionID: 'stock_logisticalForm_details',
    options: {
      shadedHeader: false,
    },
  },
  LogisticalFormFormScreen: {
    title: 'Stock_LogisticalForm',
    component: LogisticalFormFormScreen,
    isUsableOnShortcut: true,
  },
  LogisticalFormPackagingItemFormScreen: {
    title: 'Stock_Packaging',
    component: LogisticalFormPackagingItemFormScreen,
  },
};

export {
  LogisticalFormDetailsScreen,
  LogisticalFormFormScreen,
  LogisticalFormListScreen,
  LogisticalFormPackagingItemFormScreen,
};
