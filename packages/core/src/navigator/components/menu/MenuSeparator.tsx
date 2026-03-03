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
import {View, StyleSheet} from 'react-native';
import {HorizontalRule, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';

interface MenuSeparatorProps {
  title: string;
  iconSize?: number;
}

const MenuSeparator = ({title, iconSize = 15}: MenuSeparatorProps) => {
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.menuItemContainer}>
        <Icon
          style={styles.menuItemIcon}
          name="chevron-right"
          size={iconSize}
          color={Colors.secondaryColor.background}
        />
        <Text>{title}</Text>
      </View>
      <HorizontalRule style={styles.borderSeparator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 8,
  },
  menuItemContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    paddingRight: 16,
    marginLeft: '5%',
  },
  menuItemIcon: {
    marginRight: 5,
  },
  borderSeparator: {
    width: '60%',
    borderBottomWidth: 1.5,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default MenuSeparator;
