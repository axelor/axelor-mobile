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

import React, {useMemo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import {Text, WarningCard} from '@axelor/aos-mobile-ui';
import MenuItem from './MenuItem';
import {
  findIndexAndRouteOfMenu,
  getCompatibilityError,
  getMenuTitle,
  hasSubMenus,
  isMenuIncompatible,
} from '../menu.helper';
import useTranslator from '../../i18n/hooks/use-translator';

const MenuItemList = ({
  state,
  navigation,
  activeModule,
  onItemClick,
  disabled,
}) => {
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

    const onPress = _route => {
      if (_route == null) {
        return null;
      }

      onItemClick();

      const event = navigation.emit({
        type: 'drawerItemPress',
        target: _route.key,
        canPreventDefault: true,
      });

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
        navigation={navigation}
        menuItem={menuItem}
        subRoutes={subRoutes}
        onPress={onPress}
        isActive={focused}
        disabled={disabled}
      />
    );
  });
};

const Menu = ({
  state,
  navigation,
  authMenu,
  activeModule,
  onItemClick,
  compatibility,
}) => {
  const I18n = useTranslator();

  const title = useMemo(
    () => getMenuTitle(activeModule, {I18n}),
    [I18n, activeModule],
  );

  const compatibilityError = useMemo(
    () => isMenuIncompatible(compatibility),
    [compatibility],
  );

  return (
    <View style={styles.menuContainer}>
      <ScrollView
        contentContainerStyle={styles.moduleMenuContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.menuTitleContainer}>
          <Text style={styles.menuTitle}>{title}</Text>
        </View>
        {compatibilityError && (
          <WarningCard
            errorMessage={getCompatibilityError(compatibility, I18n)}
          />
        )}
        <MenuItemList
          state={state}
          navigation={navigation}
          activeModule={activeModule}
          onItemClick={onItemClick}
          disabled={compatibilityError}
        />
      </ScrollView>
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
