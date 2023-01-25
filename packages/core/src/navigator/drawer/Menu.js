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

import React, {useContext, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import {Text} from '@axelor/aos-mobile-ui';
import {ModuleNavigatorContext} from '../Navigator';
import MenuItem from './MenuItem';
import {getMenuTitle} from '../menu.helper';
import useTranslator from '../../i18n/hooks/use-translator';

const MenuItemList = ({state, navigation, activeModule, onItemClick}) => {
  const I18n = useTranslator();
  const {modulesMenus} = useContext(ModuleNavigatorContext);

  return state.routes.map((route, i) => {
    if (activeModule.menus[route.name] == null) {
      return null;
    }

    const focused =
      i === state.index && Object.keys(activeModule.menus).includes(route.name);
    const menu = modulesMenus[route.name];

    const onPress = () => {
      onItemClick();

      const event = navigation.emit({
        type: 'drawerItemPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...(focused
            ? DrawerActions.closeDrawer()
            : CommonActions.navigate({name: route.name, merge: true})),
          target: state.key,
        });
      }
    };

    return (
      <MenuItem
        key={route.key}
        title={getMenuTitle(menu, {I18n})}
        icon={menu.icon}
        disabled={menu.disabled}
        onPress={onPress}
        isActive={focused}
      />
    );
  });
};

const Menu = ({state, navigation, authMenu, activeModule, onItemClick}) => {
  const I18n = useTranslator();

  const title = useMemo(
    () => getMenuTitle(activeModule, {I18n}),
    [I18n, activeModule],
  );

  return (
    <View style={styles.menuContainer}>
      <View style={styles.moduleMenuContainer}>
        <View style={styles.menuTitleContainer}>
          <Text style={styles.menuTitle}>{title}</Text>
        </View>
        <MenuItemList
          state={state}
          navigation={navigation}
          activeModule={activeModule}
          onItemClick={onItemClick}
        />
      </View>
      <View style={styles.authMenuIcon}>{authMenu}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  moduleMenuContainer: {
    flexDirection: 'column',
    paddingVertical: 8,
  },
  menuTitleContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  authMenuIcon: {
    marginBottom: 12,
    marginLeft: 12,
  },
});

export default Menu;
