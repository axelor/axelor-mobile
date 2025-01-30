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

import React from 'react';
import {getMenuTitle, hasSubMenus} from '../menu.helper';
import useTranslator from '../../i18n/hooks/use-translator';
import SubMenuItemList from './SubMenuItemList';
import MenuItemEntry from './MenuItemEntry';

const MenuItem = ({
  state,
  route,
  navigation,
  menuItem,
  subRoutes,
  onPress = () => {},
  isActive = false,
  disabled,
}) => {
  const I18n = useTranslator();

  if (hasSubMenus(menuItem)) {
    return (
      <SubMenuItemList
        state={state}
        route={route}
        navigation={navigation}
        onPress={onPress}
        menuItem={menuItem}
        subRoutes={subRoutes}
        disabled={disabled}
      />
    );
  }

  return (
    <MenuItemEntry
      onPress={() => onPress(route)}
      title={getMenuTitle(menuItem, {I18n})}
      icon={menuItem.icon}
      disabled={menuItem.disabled || disabled}
      isActive={isActive}
    />
  );
};

export default MenuItem;
