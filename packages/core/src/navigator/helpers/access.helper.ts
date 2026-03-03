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

import {Menu, Module} from '../../app';
import {findIndexAndObjectOfModule, moduleHasMenus} from './module.helper';

function removeMenusFromOverridingModule(
  menus: {[key: string]: Menu},
  keyToRemove: string[],
): {[key: string]: Menu} {
  const _menus = {...menus};
  keyToRemove.forEach(_key => delete _menus[_key]);

  return _menus;
}

export function manageOverridingMenus(modules: Module[]): Module[] {
  if (modules == null) {
    return modules;
  }

  let result: Module[] = [];

  modules.forEach(_module => {
    if (moduleHasMenus(_module)) {
      const menusToRemove = [];

      Object.keys(_module.menus).forEach(_menuKey => {
        const menu: Menu = _module.menus[_menuKey];
        const menuParentField = menu?.parent;

        if (menuParentField != null && menuParentField !== _module.name) {
          const {module: parentModule, index} = findIndexAndObjectOfModule(
            result,
            menuParentField,
          );

          if (index && parentModule) {
            result[index] = {
              ...parentModule,
              menus: {
                ...parentModule.menus,
                [_menuKey]: {
                  ...menu,
                  compatibilityAOS:
                    (menu as any).compatibilityAOS ?? _module.compatibilityAOS,
                },
              },
            };
          }

          menusToRemove.push(_menuKey);
        }
      });

      const clearedModule = {
        ..._module,
        menus: removeMenusFromOverridingModule(_module.menus, menusToRemove),
      };

      result.push(clearedModule);
    } else {
      result.push(_module);
    }
  });

  return result;
}

export function manageWebConfig(modules: Module[], storeState: any): Module[] {
  if (modules == null) {
    return modules;
  }

  let result: Module[] = [];

  modules.forEach(_module => {
    if (moduleHasMenus(_module)) {
      const menusToRemove = [];

      const menusNames = Object.keys(_module.menus);

      menusNames.forEach(_menuKey => {
        const menu: Menu = _module.menus[_menuKey];

        if (menu.hideIf && menu.hideIf(storeState)) {
          menusToRemove.push(_menuKey);
        }
      });

      const clearedModule = {
        ..._module,
        menus: removeMenusFromOverridingModule(_module.menus, menusToRemove),
      };

      result.push(clearedModule);
    } else {
      result.push(_module);
    }
  });

  return result;
}

function updateAccessibleMenus(
  _module: Module,
  isCustomizeMenuEnabled: boolean,
  accessibleMenus: any[],
): Module {
  if (moduleHasMenus(_module)) {
    const enabledMenus = {};
    const {menus} = _module;

    Object.keys(menus).forEach(_key => {
      const accessibleMenu = accessibleMenus?.find(
        menu => menu.technicalName === _key,
      );
      if (!isCustomizeMenuEnabled || accessibleMenu) {
        enabledMenus[_key] = menus[_key];
        if (accessibleMenu) {
          enabledMenus[_key].order = accessibleMenu.menuOrder;
        }
      }
    });

    return {
      ..._module,
      menus: enabledMenus,
    };
  }

  return _module;
}

export function checkModulesMenusAccessibility(
  modules: Module[],
  webConfig: any[],
) {
  if (!Array.isArray(modules) || modules.length === 0) {
    return [];
  } else if (!Array.isArray(webConfig) || webConfig.length === 0) {
    return modules;
  }

  const authorizedModules = [];

  modules.forEach(_module => {
    const mobileConfigForModule = webConfig.find(
      app => app.sequence === _module.name,
    );

    if (mobileConfigForModule == null || mobileConfigForModule?.isAppEnabled) {
      authorizedModules.push(
        updateAccessibleMenus(
          _module,
          mobileConfigForModule?.isCustomizeMenuEnabled,
          mobileConfigForModule?.accessibleMenuList,
        ),
      );
    }
  });

  return authorizedModules;
}
