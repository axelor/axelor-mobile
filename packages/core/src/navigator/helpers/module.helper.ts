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

import {Module} from '../../app';

export function findIndexAndObjectOfModule(
  modules: Module[],
  moduleName: string,
): {module: Module; index: number} {
  const index = modules.findIndex(_module => _module.name === moduleName);

  if (index === -1) {
    return {module: null, index: null};
  }

  return {module: modules[index], index: index};
}

export function moduleHasMenus(_module: Module) {
  return Object.keys(_module.menus ?? {}).length > 0;
}

export function getDefaultModule(modules: Module[], mainMenu: string): Module {
  if (!Array.isArray(modules) || modules.length === 0) {
    return null;
  } else if (mainMenu != null && modulesContainsMenu(modules, mainMenu)) {
    return findModuleWithMenu(modules, mainMenu);
  } else {
    return firstModulesWithMenus(modules);
  }
}

function authModuleFilter(_module: Module) {
  return _module.name !== 'Auth';
}

export function numberOfModules(modules: Module[]) {
  return modules.filter(authModuleFilter).filter(moduleHasMenus).length;
}

function modulesContainsMenu(modules: Module[], menuKey: string) {
  return modules
    .filter(moduleHasMenus)
    .some(_module => _module.menus[menuKey] != null);
}

function findModuleWithMenu(modules: Module[], menuKey: string) {
  return modules
    .filter(moduleHasMenus)
    .find(_module => _module.menus[menuKey] != null);
}

function firstModulesWithMenus(modules: Module[]) {
  return modules.filter(moduleHasMenus)?.[0];
}
