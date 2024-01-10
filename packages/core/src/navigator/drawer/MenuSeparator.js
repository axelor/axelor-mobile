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
import {View, StyleSheet} from 'react-native';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';

const MenuSeparator = ({title, iconSize = 10, style}) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  return (
    <View style={styles.container}>
      <View style={styles.childrenContainer}>
        <View style={[styles.menuItemActive]} />
        <View style={[styles.menuItemContainer, style]}>
          <Icon
            style={styles.menuItemIcon}
            name={'chevron-right'}
            size={iconSize}
            color={Colors.secondaryColor.background}
          />
          <View style={styles.menuItemTextContainer}>
            <Text style={styles.menuItemTitle}>{title}</Text>
          </View>
        </View>
      </View>
      <View style={styles.borderSeparator} />
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingVertical: 8,
    },
    childrenContainer: {
      flexDirection: 'row',
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
      marginLeft: 0,
      marginRight: 5,
    },
    menuItemTextContainer: {
      flex: 1,
      alignSelf: 'center',
      paddingRight: 16,
    },
    menuItemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.secondaryColor.background,
    },
    borderSeparator: {
      width: '60%',
      borderBottomWidth: 1.5,
      borderBottomColor: Colors.secondaryColor.background,
      marginTop: 5,
      left: '15%',
    },
  });

export default MenuSeparator;
