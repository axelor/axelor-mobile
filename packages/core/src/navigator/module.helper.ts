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

import {Compatibility, Menu, Module, Tool} from '../app';

export function checkModulesMenusAccessibility(modules, mobileSettingsApps) {
  if (!Array.isArray(modules) || modules.length === 0) {
    return [];
  } else if (
    !Array.isArray(mobileSettingsApps) ||
    mobileSettingsApps.length === 0
  ) {
    return modules;
  }

  const authorizedModules = [];

  modules.forEach(_module => {
    const mobileConfigForModule = mobileSettingsApps.find(
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

export function moduleHasMenus(_module) {
  return _module.menus != null && Object.keys(_module.menus).length > 0;
}

export function filterEnabledMenus(
  _module,
  isCustomizeMenuEnabled,
  accessibleMenus,
) {
  if (moduleHasMenus(_module)) {
    const enabledMenus = {};
    const {menus} = _module;
    const menuKeys = Object.keys(menus);

    menuKeys.forEach(_key => {
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

    return enabledMenus;
  }
  return [];
}

export function updateAccessibleMenus(
  _module,
  isCustomizeMenuEnabled,
  accessibleMenus,
) {
  return {
    ..._module,
    menus: filterEnabledMenus(_module, isCustomizeMenuEnabled, accessibleMenus),
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

export function manageMenuCompatibility(
  menus: any,
  metaModules: any[],
  parentWebModule: any,
): any {
  if (menus != null) {
    const _menus: any = menus ? {} : null;

    for (const key in menus) {
      const _menu = menus[key];
      let compatibilityAOS = _menu.compatibilityAOS;

      const menuWebModule =
        _menu.compatibilityAOS?.moduleName != null
          ? metaModules?.find(
              _item => _item.name === _menu.compatibilityAOS?.moduleName,
            )
          : parentWebModule;

      if (_menu.compatibilityAOS != null) {
        compatibilityAOS = {
          ..._menu.compatibilityAOS,
          moduleName: _menu.compatibilityAOS.moduleName ?? menuWebModule?.name,
          moduleVersion: menuWebModule?.moduleVersion,
        };
      }

      if (_menu.subMenus != null) {
        _menus[key] = {
          ..._menu,
          compatibilityAOS,
          subMenus: manageMenuCompatibility(
            _menu.subMenus,
            metaModules,
            menuWebModule,
          ),
        };
      } else {
        _menus[key] = {
          ..._menu,
          compatibilityAOS,
        };
      }
    }

    return _menus;
  }

  return null;
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

      if (_module.menus != null) {
        return {
          ..._module,
          compatibilityAOS: {
            ..._module.compatibilityAOS,
            moduleVersion: webModule?.moduleVersion,
          },
          menus: manageMenuCompatibility(_module.menus, metaModules, webModule),
        };
      } else {
        return {
          ..._module,
          compatibilityAOS: {
            ..._module.compatibilityAOS,
            moduleVersion: webModule?.moduleVersion,
          },
        };
      }
    }

    return _module;
  });
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

export const addModuleTools = (
  registeredTools: Tool[],
  module: Module,
): Tool[] => {
  const currentTools = registeredTools.map(_i => _i.key);
  const moduleTools = module.globalTools;

  let result: Tool[] =
    moduleTools.filter(({key}) => !currentTools.includes(key)) ?? [];

  registeredTools.forEach(_tool => {
    const overrideTool = moduleTools.find(({key}) => key === _tool.key);

    if (overrideTool == null) {
      result.push(_tool);
    } else {
      result.push({
        ..._tool,
        ...overrideTool,
      });
    }
  });

  return result;
};

export const addToolDefaultValues = (tool: Tool, idx: number): Tool => {
  return {
    ...tool,
    order: tool.order ?? idx * 10,
    hideIf: tool.hideIf != null ? tool.hideIf : () => false,
    disabledIf: tool.disabledIf != null ? tool.disabledIf : () => false,
  };
};
