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

import {Module} from './types';

export const erpAccressModule: Module = {
  name: 'app-erp-access',
  title: 'Base_ERPAccesss',
  subtitle: 'Base_ERPAccesss',
  icon: 'box-arrow-up-right',
  quickNavigation: true,
  menus: {
    core_menu_erpAccess: {
      title: 'Base_ERPAccesss',
      icon: 'box-arrow-up-right',
      screen: 'ERPAccessScreen',
      isDefault: true,
    },
  },
};
