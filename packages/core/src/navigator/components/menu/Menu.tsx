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
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, WarningCard} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {Compatibility, Module} from '../../../app';
import {
  DrawerState,
  getCompatibilityError,
  getMenuTitle,
  isMenuIncompatible,
} from '../../helpers';
import MenuItemList from './MenuItemList';

interface MenuProps {
  state: DrawerState;
  navigation: any;
  authMenu?: React.ReactNode;
  activeModule: Module;
  onItemClick: () => void;
  compatibility: Compatibility;
}

const Menu = ({
  state,
  navigation,
  authMenu,
  activeModule,
  onItemClick,
  compatibility,
}: MenuProps) => {
  const I18n = useTranslator();

  const title = useMemo(
    () => getMenuTitle(activeModule, I18n),
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
