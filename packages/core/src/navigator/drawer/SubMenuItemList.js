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

import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {animationUtil} from '@axelor/aos-mobile-ui';
import MenuItemEntry from './MenuItemEntry';
import {getMenuTitle, resolveSubMenus} from '../menu.helper';
import SubMenuItem from './SubMenuItem';
import {useTranslator} from '../../i18n';

const SubMenuItemList = ({
  state,
  route,
  navigation,
  menuItem,
  subRoutes = [],
  onPress = () => {},
  disabled,
}) => {
  const I18n = useTranslator();

  const [dropdown, setDropdown] = useState(false);

  const handleDropdownPress = useCallback(() => {
    animationUtil.animateNext();
    setDropdown(!dropdown);
  }, [dropdown]);

  const _subMenus = resolveSubMenus(menuItem.subMenus);

  return (
    <View>
      <MenuItemEntry
        state={state}
        route={route}
        navigation={navigation}
        icon={menuItem.icon}
        title={getMenuTitle(menuItem, {I18n})}
        disabled={menuItem.disabled || disabled}
        compatibility={menuItem.compatibilityAOS}
        onPress={handleDropdownPress}
        isDropdown={true}
        dropdown={dropdown}
      />
      {dropdown && (
        <View>
          {_subMenus.map((subMenu, i) => {
            const subRoute = subRoutes[i];

            const index = state.routes.findIndex(_r => _r.key === subRoute.key);
            const focused = index === state.index;

            return (
              <SubMenuItem
                key={subRoute.key}
                route={subRoute}
                subMenu={subMenu}
                onPress={onPress}
                isActive={focused}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default SubMenuItemList;
