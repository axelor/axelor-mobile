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
import {StyleSheet} from 'react-native';
import {useTranslator} from '../../../i18n';
import {SubMenu} from '../../../app';
import {getMenuTitle} from '../../helpers';
import MenuItemEntry from './MenuItemEntry';

const SUB_MENU_ICON_SIZE = 20;

interface SubMenuItemProps {
  subMenu: SubMenu;
  onPress: () => void;
  isActive?: boolean;
}

const SubMenuItem = ({
  subMenu,
  onPress,
  isActive = false,
}: SubMenuItemProps) => {
  const I18n = useTranslator();

  return (
    <MenuItemEntry
      icon={subMenu.icon}
      title={getMenuTitle(subMenu, I18n)}
      disabled={subMenu.disabled}
      compatibility={subMenu.compatibilityAOS}
      iconSize={SUB_MENU_ICON_SIZE}
      onPress={onPress}
      isActive={isActive}
      style={styles.subMenuItem}
    />
  );
};

const styles = StyleSheet.create({
  subMenuItem: {
    marginLeft: 20,
    width: '93%',
  },
});

export default SubMenuItem;
