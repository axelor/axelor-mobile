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

import ActiveCartScreen from './ActiveCartScreen';
import CartLineDetailsScreen from './CartLineDetailsScreen';
import CatalogScreen from './CatalogScreen';

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
    actionID: 'sale_cartLine_details',
    component: CartLineDetailsScreen,
  },
  CatalogScreen: {
    title: 'Sale_Catalog',
    component: CatalogScreen,
    actionID: 'sale_product_list',
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
};

export {ActiveCartScreen};
export {CartLineDetailsScreen};
export {CatalogScreen};
