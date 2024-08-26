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

import ActiveCartScreen from './ActiveCartScreen';
import CartLineDetailsScreen from './CartLineDetailsScreen';

export default {
  ActiveCartScreen: {
    title: 'Sale_Cart',
    actionID: 'sale_active_cart',
    component: ActiveCartScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  CartLineDetailsScreen: {
    title: 'Sale_Cart',
    actionID: 'sale_details_cart_line',
    component: CartLineDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {CartLineDetailsScreen};
export {ActiveCartScreen};