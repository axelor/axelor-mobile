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

import {checkNullString} from '@axelor/aos-mobile-ui';
import {
  Compatibility,
  Menu,
  MenuWithSubMenus,
  Module,
  SubMenu,
} from '../../app';
import {TranslatorProps} from '../../i18n';
import {formatVersionString} from '../../utils';
import {formatCompatibilityToDisplay} from './compatibility.helper';
import {Route} from './navigation-type';
import {moduleHasMenus} from './module.helper';

export function findIndexAndRouteOfMenu(
  routes: Route[],
  menuName: string,
): {route: Route; index: number} {
  const index = routes.findIndex(_route => _route.name === menuName);

  if (index === -1) {
    return {route: null, index: null};
  }

  return {route: routes[index], index: index};
}

export function getMenuTitle(
  menu: Menu | Module,
  I18n: TranslatorProps,
): string {
  if (menu.title != null) {
    return I18n.t(menu.title);
  }
  return (menu as any).screen;
}

function isModuleNotFound(compatibility: Compatibility) {
  return compatibility?.moduleVersion == null;
}

function isVersionTooLow(compatibility: Compatibility) {
  const moduleVersion = formatVersionString(compatibility.moduleVersion);

  return (
    !checkNullString(compatibility.downToVersion) &&
    moduleVersion < formatVersionString(compatibility.downToVersion)
  );
}

function isVersionTooHigh(compatibility: Compatibility) {
  const moduleVersion = formatVersionString(compatibility.moduleVersion);

  return (
    !checkNullString(compatibility.upToVersion) &&
    moduleVersion >= formatVersionString(compatibility.upToVersion)
  );
}

export function isMenuIncompatible(compatibility: Compatibility) {
  if (compatibility == null) {
    return false;
  }

  return (
    isModuleNotFound(compatibility) ||
    isVersionTooLow(compatibility) ||
    isVersionTooHigh(compatibility)
  );
}

export function getCompatibilityError(
  compatibility: Compatibility,
  I18n: TranslatorProps,
  showDetails: boolean = true,
) {
  if (compatibility == null) {
    return undefined;
  }

  const compatibilityVersions = formatCompatibilityToDisplay(compatibility);

  if (isModuleNotFound(compatibility)) {
    return I18n.t(
      showDetails
        ? 'Base_Compatibility_NotFoundDetails'
        : 'Base_Compatibility_NotFound',
      compatibilityVersions,
    );
  }

  if (isVersionTooLow(compatibility)) {
    return I18n.t(
      showDetails
        ? 'Base_Compatibility_ErrorTooLowDetails'
        : 'Base_Compatibility_ErrorTooLow',
      compatibilityVersions,
    );
  }

  if (isVersionTooHigh(compatibility)) {
    return I18n.t(
      showDetails
        ? 'Base_Compatibility_ErrorTooHighDetails'
        : 'Base_Compatibility_ErrorTooHigh',
      compatibilityVersions,
    );
  }

  return undefined;
}

export function formatMenus(module: Module) {
  return Object.fromEntries(
    Object.entries(module.menus).map(([key, menu], idx) => {
      return [
        key,
        {...menu, order: menu.order ?? idx * 10, parent: module.name},
      ];
    }),
  );
}

export function hasSubMenus(menu: Menu) {
  return Object.keys(menu ?? {}).includes('subMenus');
}

export function resolveSubMenus(subMenus: {[key: string]: SubMenu}) {
  if (subMenus == null || Object.keys(subMenus).length === 0) {
    return [];
  }

  return Object.entries(subMenus)
    .map(([key, content]) => ({...content, key}))
    .map((item, index) => {
      if (item?.order != null) {
        return item;
      }

      return {...item, order: index * 10};
    })
    .sort((a, b) => a.order - b.order);
}

export function manageSubMenusOverriding(modules: Module[]) {
  const allMenus: {[key: string]: Menu} = {};

  modules.forEach(module => {
    if (module.menus) {
      Object.entries(module.menus).forEach(([menuKey, menu]) => {
        allMenus[menuKey] = menu;
      });
    }
  });

  modules.forEach(module => {
    if (module.menus) {
      Object.values(module.menus).forEach(menu => {
        if (hasSubMenus(menu)) {
          const _menu = menu as MenuWithSubMenus;
          _menu.subMenus = Object.entries(_menu.subMenus).reduce(
            (acc, [subMenuKey, subMenu]) => {
              if ('parent' in subMenu) {
                const parentMenu = allMenus[subMenu.parent] as MenuWithSubMenus;

                if (parentMenu) {
                  if (!parentMenu.subMenus) {
                    parentMenu.subMenus = {};
                  }

                  parentMenu.subMenus[subMenuKey] = {
                    ...subMenu,
                    compatibilityAOS:
                      subMenu.compatibilityAOS ??
                      _menu.compatibilityAOS ??
                      module.compatibilityAOS,
                  };
                  delete parentMenu.subMenus[subMenuKey].parent;
                }
              } else {
                acc[subMenuKey] = subMenu;
              }

              return acc;
            },
            {},
          );
        }
      });
    }
  });

  return cleanEmptyMenusAndSubMenus(modules);
}

function cleanEmptyMenusAndSubMenus(modules: Module[]) {
  const cleanedModules: Module[] = modules.map(module => {
    const {menus} = module;

    if (moduleHasMenus(module)) {
      const cleanedMenus = Object.entries(menus).map(([key, menu]) => {
        const {subMenus, ...restMenusAttrs} = menu as MenuWithSubMenus;

        if (hasSubMenus(menu) && Object.keys(subMenus).length === 0) {
          return [key, {...restMenusAttrs}];
        }

        return [key, menu];
      });

      return {...module, menus: Object.fromEntries(cleanedMenus)};
    }

    return module;
  });

  return cleanedModules;
}

export function getDefaultMenuKey(module: Module) {
  if (!moduleHasMenus(module)) {
    return null;
  }

  const defaultMenuEntry = Object.entries(module.menus)
    .map(([key, menu]) => ({...menu, key}))
    .filter((menu: any) => !isMenuIncompatible(menu.compatibilityAOS))
    .find((menu: any) => menu.isDefault === true);

  return defaultMenuEntry ? defaultMenuEntry.key : null;
}
