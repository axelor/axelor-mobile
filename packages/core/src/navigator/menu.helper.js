/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {userHaveAccessToConfig} from './roles.helper';
import {formatVersionString} from '../utils/string';

export function findIndexAndRouteOfMenu(routes, menuName) {
  const index = routes.findIndex(_route => _route.name === menuName);

  if (index === -1) {
    return {route: null, index: null};
  }

  return {route: routes[index], index: index};
}

const userHaveAccessToMenu = ({menuConfig, user}) => {
  return userHaveAccessToConfig({config: menuConfig, user: user});
};

const areMenusRestricted = ({listMenu}) => {
  if (listMenu == null || listMenu.length === 0) {
    return false;
  }
  return true;
};

const doesMenuHasRestriction = ({menuConfig}) => {
  if (menuConfig == null) {
    return false;
  }
  return true;
};

export const isMenuEnabled = ({listMenu, menuKey, user}) => {
  if (areMenusRestricted({listMenu})) {
    const menuConfig = listMenu.find(menu => menu.technicalName === menuKey);
    if (doesMenuHasRestriction({menuConfig})) {
      return userHaveAccessToMenu({menuConfig, user});
    }
    return true;
  }
  return true;
};

export function getMenuTitle(menu, {I18n}) {
  if (menu.title != null) {
    return I18n.t(menu.title);
  }
  return menu.screen;
}

export function isModuleNotFound(compatibility) {
  return compatibility?.moduleVersion == null;
}

export function isMenuIncompatible(compatibility) {
  if (compatibility == null) {
    return false;
  }

  if (isModuleNotFound(compatibility)) {
    return true;
  }

  const moduleVersion = formatVersionString(compatibility.moduleVersion);

  if (
    !checkNullString(compatibility.downToVersion) &&
    moduleVersion < formatVersionString(compatibility.downToVersion)
  ) {
    return true;
  }

  if (
    !checkNullString(compatibility.upToVersion) &&
    moduleVersion >= formatVersionString(compatibility.upToVersion)
  ) {
    return true;
  }

  return false;
}

export function hasSubMenus(menu) {
  return (
    menu != null &&
    Object.keys(menu).length > 0 &&
    Object.keys(menu).includes('subMenus')
  );
}

export function resolveSubMenus(subMenus) {
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

export function manageSubMenusOverriding(modules) {
  const allMenus = {};

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
        if (menu.subMenus && Object.keys(menu.subMenus).length !== 0) {
          menu.subMenus = Object.entries(menu.subMenus).reduce(
            (acc, [subMenuKey, subMenu]) => {
              if ('parent' in subMenu) {
                const parentMenuName = subMenu.parent;
                const parentMenu = allMenus[parentMenuName];

                if (parentMenu) {
                  if (!parentMenu.subMenus) {
                    parentMenu.subMenus = {};
                  }

                  parentMenu.subMenus[subMenuKey] = {...subMenu};
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

export function cleanEmptyMenusAndSubMenus(modules) {
  const cleanedModules = modules.map(module => {
    const {menus, ...restModuleAttrs} = module;

    if (menus) {
      if (Object.keys(menus).length === 0) {
        return {...restModuleAttrs};
      }

      const cleanedMenus = Object.entries(menus).map(([key, menu]) => {
        const {subMenus, ...restMenusAttrs} = menu;

        if (subMenus && Object.keys(subMenus).length === 0) {
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
