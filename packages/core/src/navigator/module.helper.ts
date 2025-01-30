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

import {Module} from '../app';
import {Compatibility, Menu} from '../app/Module';
import {isMenuEnabled} from './menu.helper';
import {userHaveAccessToConfig} from './roles.helper';

export function filterAuthorizedModules(
  modules,
  mobileConfigs,
  restrictedMenus,
  user,
) {
  if (!Array.isArray(modules) || modules.length === 0) {
    return [];
  } else if (!Array.isArray(mobileConfigs) || mobileConfigs.length === 0) {
    return modules;
  }

  const authorizedModules = [];

  modules.forEach(_module => {
    const updatedModule = updateAccessibleMenus(_module, restrictedMenus, user);
    const mobileConfigForModule = mobileConfigs?.find(
      config => config.sequence === updatedModule.name,
    );

    if (mobileConfigForModule == null) {
      authorizedModules.push(updatedModule);
    } else if (mobileConfigForModule.isAppEnabled) {
      if (
        !Array.isArray(mobileConfigForModule.authorizedRoles) ||
        mobileConfigForModule.authorizedRoles.length === 0
      ) {
        authorizedModules.push(updatedModule);
      } else if (
        userHaveAccessToConfig({config: mobileConfigForModule, user: user})
      ) {
        authorizedModules.push(updatedModule);
      }
    }
  });

  return authorizedModules;
}

export function findIndexAndObjectOfModule(
  modules: Module[],
  moduleName: string,
) {
  const index = modules.findIndex(_module => _module.name === moduleName);

  if (index === -1) {
    return {module: null, index: null};
  }

  return {module: modules[index], index: index};
}

export function removeMenusFromOverridingModule(menus, keyToRemove: string[]) {
  const _menus = {...menus};
  keyToRemove.forEach(_key => delete _menus[_key]);

  return _menus;
}

export function manageOverridingMenus(modules: Module[]) {
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
        const menuParentField = menu?.parent;

        if (menuParentField != null && menuParentField !== _module.name) {
          const {module: parentModule, index} = findIndexAndObjectOfModule(
            result,
            menuParentField,
          );

          if (index && parentModule) {
            result[index] = {
              ...parentModule,
              menus: {...parentModule.menus, [_menuKey]: menu},
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

export function moduleHasMenus(_module) {
  return _module.menus != null && Object.keys(_module.menus).length > 0;
}

export function filterEnabledMenus(_module, restrictedMenus, user) {
  if (moduleHasMenus(_module)) {
    const enabledMenus = {};
    const {menus} = _module;
    const menuKeys = Object.keys(menus);
    menuKeys.forEach(_key => {
      if (
        isMenuEnabled({listMenu: restrictedMenus, menuKey: _key, user: user})
      ) {
        enabledMenus[_key] = menus[_key];
      }
    });
    return enabledMenus;
  }
  return [];
}

export function updateAccessibleMenus(_module, restrictedMenus, user) {
  return {
    ..._module,
    menus: filterEnabledMenus(_module, restrictedMenus, user),
  };
}

export function getDefaultModule(modules, mainMenu) {
  if (modules == null || modules.length === 0) {
    return null;
  }
  if (mainMenu != null && modulesContainsMenu(modules, mainMenu)) {
    return findModuleWithMenu(modules, mainMenu);
  }
  return firstModulesWithMenus(modules);
}

export function numberOfModules(modules) {
  return modules.filter(authModuleFilter).filter(moduleHasMenus).length;
}

function modulesContainsMenu(modules, menuKey) {
  return modules
    .filter(moduleHasMenus)
    .some(_module => _module.menus[menuKey] != null);
}

function findModuleWithMenu(modules, menuKey) {
  return modules
    .filter(moduleHasMenus)
    .find(_module => _module.menus[menuKey] != null);
}

function firstModulesWithMenus(modules) {
  return modules
    .filter(_module => _module.menus)
    .find(_module => Object.keys(_module.menus).length > 0);
}

export function authModuleFilter(_module) {
  return _module.name !== 'Auth';
}

export function manageWebCompatibility(
  modules: Module[],
  metaModules: any[],
): Module[] {
  if (!Array.isArray(modules) || modules.length === 0) {
    return [];
  }

  const _modules = manageCompatibilityOverride(modules);

  return _modules.map((_module: Module): Module => {
    if (_module.compatibilityAOS != null) {
      const webModule = metaModules?.find(
        _item => _item.name === _module.compatibilityAOS.moduleName,
      );

      return {
        ..._module,
        compatibilityAOS: {
          ..._module.compatibilityAOS,
          moduleVersion: webModule?.moduleVersion,
        },
      };
    }
    return _module;
  });
}

export function formatCompatibilityToDisplay(
  compatibility: Compatibility,
): Compatibility {
  return {
    downToVersion: '-',
    upToVersion: '-',
    ...compatibility,
  };
}

export function findModuleDependingOnWeb(
  modules: Module[],
  webModuleName: string,
) {
  const index = modules.findIndex(
    _module => _module.compatibilityAOS?.moduleName === webModuleName,
  );

  if (index === -1) {
    return {module: null, index: null};
  }

  return {module: modules[index], index: index};
}

export const manageCompatibilityOverride = (modules: Module[]): Module[] => {
  if (modules == null) {
    return modules;
  }

  let result: Module[] = [];

  modules.forEach(_module => {
    if (_module.compatibilityAOS != null) {
      const {module: parentModule, index} = findModuleDependingOnWeb(
        result,
        _module.compatibilityAOS.moduleName,
      );

      if (index && parentModule) {
        result[index] = {
          ...parentModule,
          compatibilityAOS: {
            ...parentModule.compatibilityAOS,
            ..._module.compatibilityAOS,
          },
        };

        result.push({..._module, compatibilityAOS: null});
      } else {
        result.push(_module);
      }
    } else {
      result.push(_module);
    }
  });

  return result;
};
