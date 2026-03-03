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

import React from 'react';
import {
  Menu,
  MenuWithSubMenus,
  MenuSeparator as Separator,
  RootMenuWithScreen,
} from '../../../app';
import {useTranslator} from '../../../i18n';
import {DrawerState, getMenuTitle, hasSubMenus, Route} from '../../helpers';
import SubMenuItemList from './SubMenuItemList';
import MenuItemEntry from './MenuItemEntry';
import MenuSeparator from './MenuSeparator';

interface MenuItemProps {
  state: DrawerState;
  route: Route;
  menuItem: Menu;
  subRoutes: Route[];
  onPress: (route: Route) => void;
  isActive?: boolean;
  disabled?: boolean;
}

const MenuItem = ({
  state,
  route,
  menuItem,
  subRoutes,
  onPress,
  isActive = false,
  disabled = false,
}: MenuItemProps) => {
  const I18n = useTranslator();

  if (hasSubMenus(menuItem)) {
    return (
      <SubMenuItemList
        state={state}
        menuItem={menuItem as MenuWithSubMenus}
        subRoutes={subRoutes}
        onPress={onPress}
        disabled={disabled}
      />
    );
  }

  if ((menuItem as Separator).separator) {
    return <MenuSeparator title={getMenuTitle(menuItem, I18n)} />;
  }

  return (
    <MenuItemEntry
      onPress={() => onPress(route)}
      title={getMenuTitle(menuItem, I18n)}
      icon={(menuItem as RootMenuWithScreen).icon}
      disabled={(menuItem as RootMenuWithScreen).disabled || disabled}
      compatibility={(menuItem as RootMenuWithScreen).compatibilityAOS}
      isActive={isActive}
    />
  );
};

export default MenuItem;
