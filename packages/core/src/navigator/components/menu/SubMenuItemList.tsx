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

import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {animationUtil} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {MenuWithSubMenus} from '../../../app';
import {DrawerState, getMenuTitle, resolveSubMenus, Route} from '../../helpers';
import MenuItemEntry from './MenuItemEntry';
import SubMenuItem from './SubMenuItem';

interface SubMenuItemListProps {
  state: DrawerState;
  menuItem: MenuWithSubMenus;
  subRoutes: Route[];
  onPress: (route: Route) => void;
  disabled?: boolean;
}

const SubMenuItemList = ({
  state,
  menuItem,
  subRoutes,
  onPress,
  disabled = false,
}: SubMenuItemListProps) => {
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
        icon={menuItem.icon}
        title={getMenuTitle(menuItem, I18n)}
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
                subMenu={subMenu}
                onPress={() => onPress(subRoute)}
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
