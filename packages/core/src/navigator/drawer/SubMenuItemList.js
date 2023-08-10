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

import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {animationUtil} from '@axelor/aos-mobile-ui';
import MenuItemEntry from './MenuItemEntry';
import {resolveSubMenus} from '../menu.helper';
import SubMenuItem from './SubMenuItem';

const SubMenuItemList = ({
  state,
  route,
  navigation,
  menuItem,
  subRoutes = [],
  onPress = () => {},
}) => {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdownPress = useCallback(() => {
    animationUtil.animateNext();
    setDropdown(!dropdown);
  }, [dropdown]);

  const {title, icon, disabled, subMenus} = menuItem;

  const _subMenus = resolveSubMenus(subMenus);

  return (
    <View>
      <MenuItemEntry
        state={state}
        route={route}
        navigation={navigation}
        icon={icon}
        title={title}
        disabled={disabled}
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
