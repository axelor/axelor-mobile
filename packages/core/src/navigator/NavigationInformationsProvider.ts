import {Menu as DrawerMenu, Screen as NavigationScreen} from '../app';
import {MenuWithSubMenus} from '../app/Module';
import {isEmpty} from '../utils';
import {hasSubMenus} from './menu.helper';

type MenuType = 'menu' | 'separator' | 'submenu';

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
            menuType: 'submenu',
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

const getMenuType = (menu: any): MenuType => {
  if (menu.separator) {
    return 'separator';
  }

  return 'menu';
};

export const navigationInformations = new NavigationInformationsProvider();
