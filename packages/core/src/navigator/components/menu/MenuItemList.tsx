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

import React, {useMemo} from 'react';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import {Module} from '../../../app';
import {
  DrawerState,
  findIndexAndRouteOfMenu,
  hasSubMenus,
  NavigationObject,
  Route,
} from '../../helpers';
import MenuItem from './MenuItem';

interface MenuItemListProps {
  state: DrawerState;
  navigation: NavigationObject;
  activeModule: Module;
  onItemClick: () => void;
  disabled?: boolean;
}

const MenuItemList = ({
  state,
  navigation,
  activeModule,
  onItemClick,
  disabled,
}: MenuItemListProps) => {
  const generateSubRoutes = menuItem => {
    if (hasSubMenus(menuItem)) {
      const {subMenus} = menuItem;
      return state.routes.filter(subRoute => subRoute.name in subMenus);
    }
    return [];
  };

  const moduleEntries = useMemo(() => {
    return state.routes
      .filter(_route => activeModule.menus[_route.name] != null)
      .map(route => ({...activeModule.menus[route.name], key: route.name}))
      .map((item, index) => {
        if (item.order != null) {
          return item;
        }

        return {...item, order: index * 10};
      })
      .sort((a, b) => a.order - b.order);
  }, [activeModule, state.routes]);

  return moduleEntries.map(menuItem => {
    const {route, index: i} = findIndexAndRouteOfMenu(
      state.routes,
      menuItem.key,
    );

    const focused =
      i === state.index && Object.keys(activeModule.menus).includes(route.name);

    const onPress = (_route: Route) => {
      if (_route == null) {
        return null;
      }

      onItemClick();

      const event: any = navigation.emit({
        type: 'drawerItemPress',
        target: _route.key,
        canPreventDefault: true,
      } as any);

      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...(focused
            ? DrawerActions.closeDrawer()
            : CommonActions.navigate({name: _route.name, merge: true})),
          target: state.key,
        });
      }
    };

    const subRoutes = generateSubRoutes(menuItem);

    return (
      <MenuItem
        key={route.key}
        state={state}
        route={route}
        menuItem={menuItem}
        subRoutes={subRoutes}
        onPress={onPress}
        isActive={focused}
        disabled={disabled}
      />
    );
  });
};

export default MenuItemList;
