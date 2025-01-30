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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Color} from '../../../theme/themes';
import {Badge} from '../../molecules';
import {Text} from '../../atoms';

interface MultiSelectValueProps {
  color?: Color;
  itemList: string[];
  style?: any;
  title: string;
}

const MultiSelectValue = ({
  color,
  itemList,
  style,
  title,
}: MultiSelectValueProps) => {
  const Colors = useThemeColor();

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {itemList != null && itemList?.length > 0
        ? itemList.map((item, index) => (
            <Badge
              key={'index' + index}
              title={item}
              color={color || Colors.primaryColor}
              style={styles.badge}
            />
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  badge: {
    width: null,
    marginVertical: 2,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 14,
    marginRight: 10,
  },
});

export default MultiSelectValue;
