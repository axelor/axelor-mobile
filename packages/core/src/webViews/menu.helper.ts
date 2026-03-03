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

import {Menu, modulesProvider, Screen} from '../app';
import {fetchWebViewConfigs} from './api.helpers';
import {createWebViewActionID} from './display.helpers';
import {WebViewScreen} from './view';
import {getRoles} from '../utils';

type WebViewMenuConfig = {
  [menuKey: string]: {menu: Menu; configRoles: any[]};
};

type Menus = {
  [menuKey: string]: Menu;
};

type Screens = {
  [screenKey: string]: Screen;
};

const createScreenComponent = id => {
  return props => WebViewScreen({...props, webViewId: id});
};

export const createWebViewScreens = (
  webViewConfigs: {
    id: number;
    appName: string;
    isAosWebView: boolean;
    menuTitle?: string;
    iconName?: string;
    menuOrder?: number;
    authorizedRoleSet: any[];
  }[],
): {menus: WebViewMenuConfig; screens: Screens} => {
  const screens: Screens = {};
  const menus: WebViewMenuConfig = {};

  if (Array.isArray(webViewConfigs) && webViewConfigs.length > 0) {
    webViewConfigs.forEach(
      ({
        id,
        appName,
        menuTitle,
        iconName,
        menuOrder,
        authorizedRoleSet = [],
      }) => {
        const config = {
          title: menuTitle ?? 'Base_WebView',
          icon: iconName ?? 'layers',
          order: menuOrder ?? 99,
        };
        const screenKey = `WebView_${appName}_${id}`;

        screens[screenKey] = {
          title: config.title,
          component: createScreenComponent(id),
          actionID: createWebViewActionID(id),
        } as Screen;

        const _menu: Menu = {
          title: config.title,
          icon: config.icon,
          parent: appName,
          order: config.order,
          compatibilityAOS: {
            moduleName: 'axelor-mobile-settings',
            downToVersion: '8.1.0',
          },
          screen: screenKey,
        };

        menus[`${appName}_menu_webView${id}`] = {
          menu: _menu,
          configRoles: authorizedRoleSet,
        };
      },
    );
  }

  return {menus, screens};
};

export const filterAuthorizedWebViewMenus = (
  webViewConfigs: WebViewMenuConfig,
  userRoles: any[],
): Menus => {
  const menus: Menus = {};

  Object.entries(webViewConfigs)
    .filter(([_, {configRoles: authorizedRoleSet}]) => {
      if (!Array.isArray(authorizedRoleSet) || authorizedRoleSet.length === 0) {
        return true;
      } else if (!Array.isArray(userRoles) || userRoles.length === 0) {
        return false;
      } else {
        return authorizedRoleSet.some(_neededRole =>
          userRoles.find(_userRole => _userRole.id === _neededRole.id),
        );
      }
    })
    .forEach(([key, {menu}]) => {
      menus[key] = menu;
    });

  return menus;
};

export const registerWebViewModule = async (user: any) => {
  const webViewConfigs = await fetchWebViewConfigs()
    .then(res => res?.data?.data)
    .catch(() => []);

  const {screens, menus} = createWebViewScreens(webViewConfigs);
  const userRoles = getRoles(user);

  modulesProvider.registerModule({
    name: 'app-webview',
    menus: filterAuthorizedWebViewMenus(menus, userRoles),
    screens,
  });
};
