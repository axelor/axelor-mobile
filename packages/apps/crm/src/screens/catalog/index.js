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

import CatalogListScreen from './CatalogListScreen';
import CatalogFormScreen from './CatalogFormScreen';

export default {
  CatalogListScreen: {
    title: 'Crm_Catalogs',
    component: CatalogListScreen,
    actionID: 'crm_catalog_list',
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  CatalogFormScreen: {
    title: 'Crm_Catalogs',
    component: CatalogFormScreen,
  },
};

export {CatalogListScreen};
export {CatalogFormScreen};
