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
import {fetchDashboardConfigs} from './api.helpers';
import {createDashboardActionID} from './display.helpers';
import {DashboardScreen} from './view';
import {getRoles} from '../utils';

type DashboardMenuConfig = {
  [menuKey: string]: {menu: Menu; configRoles: any[]};
};

type Menus = {
  [menuKey: string]: Menu;
};

type Screens = {
  [screenKey: string]: Screen;
};

const createScreenComponent = id => {
  return props => DashboardScreen({...props, dashboardId: id});
};

export const createDashboardScreens = (
  dashboardConfigs: {
    id: number;
    appName: string;
    isCustom: boolean;
    menuTitle?: string;
    iconName?: string;
    menuOrder?: number;
    authorizedRoleSet: any[];
  }[],
): {menus: DashboardMenuConfig; screens: Screens} => {
  const screens: Screens = {};
  const menus: DashboardMenuConfig = {};

  if (Array.isArray(dashboardConfigs) && dashboardConfigs.length > 0) {
    dashboardConfigs.forEach(
      ({
        id,
        appName,
        isCustom = false,
        menuTitle,
        iconName,
        menuOrder,
        authorizedRoleSet = [],
      }) => {
        const config = isCustom
          ? {
              title: menuTitle ?? 'Base_Dashboard',
              icon: iconName ?? 'graph-up',
              order: menuOrder,
            }
          : {title: 'Base_Dashboard', icon: 'graph-up', order: -10};
        const screenKey = `Dashboard_${appName}_${id}`;

        screens[screenKey] = {
          title: config.title,
          component: createScreenComponent(id),
          actionID: createDashboardActionID(id),
        } as Screen;

        const _menu: Menu = {
          title: config.title,
          icon: config.icon,
          parent: appName,
          order: config.order,
          compatibilityAOS: {
            moduleName: 'axelor-mobile-settings',
            downToVersion: '8.0.0',
          },
          screen: screenKey,
          isDefault: true,
        };

        menus[`${appName}_menu_dashboard${id}`] = {
          menu: _menu,
          configRoles: authorizedRoleSet,
        };
      },
    );
  }

  return {menus, screens};
};

export const filterAuthorizedDashboardMenus = (
  dashboardConfigs: DashboardMenuConfig,
  userRoles: any[],
): Menus => {
  const menus: Menus = {};

  Object.entries(dashboardConfigs)
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

export const registerDashboardModule = async (user: any) => {
  const dashboardConfigs = await fetchDashboardConfigs()
    .then(res => res?.data?.data)
    .catch(() => []);

  const {screens, menus} = createDashboardScreens(dashboardConfigs);
  const userRoles = getRoles(user);

  modulesProvider.registerModule({
    name: 'app-dashboard',
    menus: filterAuthorizedDashboardMenus(menus, userRoles),
    screens,
  });
};
