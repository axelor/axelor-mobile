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

import {
  Module,
  Compatibility,
  Menu,
  MenuWithSubMenus,
  RootMenuWithScreen,
  SubMenu,
} from '../../app';
import {hasSubMenus} from './menu.helper';
import {moduleHasMenus} from './module.helper';

export function formatCompatibilityToDisplay(
  compatibility: Compatibility,
): Compatibility {
  return {
    downToVersion: '-',
    upToVersion: '-',
    ...compatibility,
  };
}

function findModuleDependingOnWeb(modules: Module[], webModuleName: string) {
  const index = modules.findIndex(
    _module => _module.compatibilityAOS?.moduleName === webModuleName,
  );

  if (index === -1) {
    return {module: null, index: null};
  }

  return {module: modules[index], index: index};
}

const manageCompatibilityOverride = (modules: Module[]): Module[] => {
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

function manageMenuCompatibility(
  menus: {[key: string]: Menu},
  metaModules: any[],
  parentWebModule: any,
) {
  if (Object.keys(menus ?? {}).length > 0) {
    const _menus: {[key: string]: Menu} = {};

    for (const [key, menu] of Object.entries(menus)) {
      if ((menu as any).compatibilityAOS) {
        _menus[key] = menu;
      }

      const _menu = menu as MenuWithSubMenus | RootMenuWithScreen;

      let compatibilityAOS = _menu.compatibilityAOS;

      const menuWebModule =
        compatibilityAOS?.moduleName != null
          ? metaModules?.find(({name}) => name === compatibilityAOS?.moduleName)
          : parentWebModule;

      if (compatibilityAOS != null) {
        compatibilityAOS = {
          ...compatibilityAOS,
          moduleName: compatibilityAOS.moduleName ?? menuWebModule?.name,
          moduleVersion: menuWebModule?.moduleVersion,
        };
      }

      if (hasSubMenus(_menu)) {
        _menus[key] = {
          ..._menu,
          compatibilityAOS,
          subMenus: manageMenuCompatibility(
            (_menu as MenuWithSubMenus).subMenus,
            metaModules,
            menuWebModule,
          ) as {[key: string]: SubMenu},
        };
      } else {
        _menus[key] = {..._menu, compatibilityAOS};
      }
    }

    return _menus;
  }

  return undefined;
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
      let compatibilityAOS = _module.compatibilityAOS;

      const webModule = metaModules?.find(
        ({name}) => name === compatibilityAOS.moduleName,
      );

      compatibilityAOS = {
        ...compatibilityAOS,
        moduleVersion: webModule?.moduleVersion,
      };

      if (moduleHasMenus(_module)) {
        return {
          ..._module,
          compatibilityAOS,
          menus: manageMenuCompatibility(_module.menus, metaModules, webModule),
        };
      } else {
        return {..._module, compatibilityAOS};
      }
    }

    return _module;
  });
}
