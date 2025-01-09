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
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';

const MenuItemEntry = ({
  icon,
  title,
  onPress = _route => {},
  isActive = false,
  disabled = false,
  isDropdown = false,
  dropdown = false,
  iconSize = 24,
  style,
}) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors, disabled), [Colors, disabled]);

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

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={styles.container}>
        <View style={[styles.menuItemActive, backgroundColor]} />
        <View style={[styles.menuItemContainer, style]}>
          {icon && (
            <Icon
              style={styles.menuItemIcon}
              name={icon}
              size={iconSize}
              color={
                disabled
                  ? Colors.secondaryColor.background_light
                  : Colors.secondaryColor_dark.background
              }
            />
          )}
          <View style={styles.menuItemTextContainer}>
            <Text style={styles.menuItemTitle}>{title}</Text>
          </View>
          {isDropdown && (
            <Icon
              name={dropdown ? 'chevron-up' : 'chevron-down'}
              color={Colors.secondaryColor_dark.background}
              style={styles.dropdownIcon}
            />
          )}
        </View>
      </View>
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

const getStyles = (Colors, disabled) =>
  StyleSheet.create({
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
      color: disabled ? Colors.secondaryColor.background_light : Colors.text,
    },
    dropdownIcon: {
      marginHorizontal: 5,
      marginRight: 20,
    },
  });

export default MenuItemEntry;
