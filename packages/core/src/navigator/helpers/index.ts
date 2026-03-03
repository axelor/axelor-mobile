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

export {
  checkModulesMenusAccessibility,
  manageOverridingMenus,
  manageWebConfig,
} from './access.helper';
export {
  formatCompatibilityToDisplay,
  manageWebCompatibility,
} from './compatibility.helper';
export {
  findIndexAndRouteOfMenu,
  formatMenus,
  getCompatibilityError,
  getDefaultMenuKey,
  getMenuTitle,
  hasSubMenus,
  isMenuIncompatible,
  manageSubMenusOverriding,
  resolveSubMenus,
} from './menu.helper';
export {
  findIndexAndObjectOfModule,
  getDefaultModule,
  moduleHasMenus,
  numberOfModules,
} from './module.helper';
export {addModuleTools, addToolDefaultValues} from './tool.helper';
export * from './navigation-type';
