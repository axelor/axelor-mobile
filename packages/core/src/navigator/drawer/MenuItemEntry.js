/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text, WarningCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {isMenuIncompatible, isModuleNotFound} from '../menu.helper';
import {useTranslator} from '../../i18n';
import {formatCompatibilityToDisplay} from '../module.helper';

const MenuItemEntry = ({
  icon,
  title,
  compatibility,
  onPress = _route => {},
  isActive = false,
  disabled = false,
  isDropdown = false,
  dropdown = false,
  iconSize = 24,
  style,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const backgroundColor = useMemo(
    () =>
      getIndicatorColor(
        !dropdown && isActive
          ? Colors.primaryColor.background
          : Colors.backgroundColor,
      ).indicator,
    [
      Colors.backgroundColor,
      Colors.primaryColor.background,
      dropdown,
      isActive,
    ],
  );

  const moduleNotFound = useMemo(
    () => isModuleNotFound(compatibility),
    [compatibility],
  );

  const compatibilityError = useMemo(
    () => isMenuIncompatible(compatibility),
    [compatibility],
  );

  const menuDisabled = useMemo(
    () => disabled || compatibilityError,
    [compatibilityError, disabled],
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={menuDisabled}>
      <View style={styles.container}>
        <View style={[styles.menuItemActive, backgroundColor]} />
        <View style={[styles.menuItemContainer, style]}>
          <Icon
            style={styles.menuItemIcon}
            name={icon}
            size={iconSize}
            color={
              menuDisabled
                ? Colors.secondaryColor.background_light
                : Colors.secondaryColor_dark.background
            }
            visible={icon != null}
          />
          <View style={styles.menuItemTextContainer}>
            <Text
              style={styles.menuItemTitle}
              textColor={
                menuDisabled
                  ? Colors.secondaryColor.background_light
                  : Colors.text
              }>
              {title}
            </Text>
          </View>
          <Icon
            name={dropdown ? 'chevron-up' : 'chevron-down'}
            color={Colors.secondaryColor_dark.background}
            style={styles.dropdownIcon}
            visible={isDropdown && !compatibilityError}
          />
          <Icon
            name="warning"
            color={Colors.errorColor.background}
            FontAwesome5={false}
            style={styles.dropdownIcon}
            visible={compatibilityError}
          />
        </View>
      </View>
      {compatibilityError && (
        <WarningCard
          style={styles.compatibilityError}
          errorMessage={I18n.t(
            moduleNotFound
              ? 'Base_Compatibility_NotFound'
              : 'Base_Compatibility_Error',
            {
              compatibility: formatCompatibilityToDisplay(compatibility),
            },
          )}
        />
      )}
    </TouchableOpacity>
  );
};

const getIndicatorColor = color => {
  return StyleSheet.create({
    indicator: {
      backgroundColor: color,
    },
  });
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  menuItemContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  menuItemActive: {
    width: 7,
    height: 32,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  menuItemIcon: {
    marginLeft: 12,
    marginRight: 18,
  },
  menuItemTextContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingRight: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownIcon: {
    marginHorizontal: 5,
    marginRight: 20,
  },
  compatibilityError: {
    marginVertical: 0,
    marginHorizontal: 7,
    width: '95%',
  },
});

export default MenuItemEntry;
