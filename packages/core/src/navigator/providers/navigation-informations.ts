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
  Menu as DrawerMenu,
  MenuWithSubMenus,
  Screen as NavigationScreen,
} from '../../app';
import {isEmpty} from '../../utils';
import {hasSubMenus} from '../helpers';

enum MenuType {
  Menu = 'menu',
  Separator = 'separator',
  Submenu = 'submenu',
}

interface Menu {
  menuKey: string;
  menuTitle: string;
  menuOrder: number;
  menuParentApplication: string;
  menuType: MenuType;
  parentMenuName: string;
}

interface Screen {
  screenKey: string;
  screenTitle: string;
  isUsableOnShortcut: boolean;
}

type List<E> = E[];

class NavigationInformationsProvider {
  private menus: List<Menu>;
  private screens: List<Screen>;

  constructor() {
    this.menus = [];
    this.screens = [];
  }

  registerMenus(menus: {[key: string]: DrawerMenu}) {
    if (isEmpty(menus)) {
      return;
    }

    const menuList = [];

    for (const [key, menu] of Object.entries(menus)) {
      menuList.push({
        menuKey: key,
        menuTitle: menu.title,
        menuOrder: menu.order,
        menuParentApplication: menu.parent,
        menuType: getMenuType(menu),
        parentMenuName: undefined,
      });

      if (hasSubMenus(menu)) {
        for (const [subKey, subMenu] of Object.entries(
          (menu as MenuWithSubMenus).subMenus,
        )) {
          menuList.push({
            menuKey: subKey,
            menuTitle: subMenu.title,
            menuOrder: subMenu.order,
            menuParentApplication: menu.parent,
            menuType: MenuType.Submenu,
            parentMenuName: key,
          });
        }
      }
    }

    this.menus = menuList;
  }

  registerScreens(screens: {[key: string]: NavigationScreen}) {
    if (isEmpty(screens)) {
      return;
    }

    const screenList = [];

    for (const [key, screen] of Object.entries(screens)) {
      screenList.push({
        screenKey: key,
        screenTitle: screen.title,
        isUsableOnShortcut: screen.isUsableOnShortcut ?? false,
      });
    }

    this.screens = screenList;
  }

  getInformations(): {
    mobileMenuList: List<Menu>;
    mobileScreenList: List<Screen>;
  } {
    return {mobileMenuList: this.menus, mobileScreenList: this.screens};
  }
}

const getMenuType = (menu: any): MenuType =>
  menu?.separator ? MenuType.Separator : MenuType.Menu;

export const navigationInformations = new NavigationInformationsProvider();
