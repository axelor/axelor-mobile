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

import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';

const MenuItem = ({icon, title, isActive, onPress, disabled}) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors, disabled), [Colors, disabled]);

  const backgroundColor = useMemo(
    () =>
      getIndicatorColor(
        isActive ? Colors.primaryColor.background : Colors.backgroundColor,
      ).container,
    [Colors.backgroundColor, Colors.primaryColor.background, isActive],
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.menuItemContainer]}>
        <View style={[styles.menuItemActive, backgroundColor]} />
        {icon && (
          <Icon
            style={styles.menuItemIcon}
            name={icon}
            size={24}
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
      </View>
    </TouchableOpacity>
  );
};

const getIndicatorColor = color => {
  return StyleSheet.create({
    container: {
      backgroundColor: color,
    },
  });
};

const getStyles = (Colors, disabled) =>
  StyleSheet.create({
    menuItemContainer: {
      flexDirection: 'row',
      paddingVertical: 8,
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
  });

export default MenuItem;
