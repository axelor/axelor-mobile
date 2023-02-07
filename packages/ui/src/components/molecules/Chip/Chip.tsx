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
import {Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from '../../atoms';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Color} from '../../../theme/themes';
import {sliceString} from '../../../utils/strings';

interface ChipProps {
  selected: boolean;
  title: string;
  onPress: (any) => void;
  selectedColor?: Color;
  width?: number;
  marginHorizontal?: number;
  style?: any;
}

const Chip = ({
  selected,
  title,
  onPress,
  selectedColor = null,
  width = Dimensions.get('window').width * 0.4,
  marginHorizontal = 12,
  style,
}: ChipProps) => {
  const Colors = useThemeColor();
  const chipColor = useMemo(
    () => (selectedColor == null ? Colors.primaryColor : selectedColor),
    [Colors.primaryColor, selectedColor],
  );

  const colorStyle = useMemo(
    () =>
      selected
        ? getStyles(chipColor, Colors).selected
        : getStyles(chipColor, Colors).notSelected,
    [Colors, chipColor, selected],
  );

  return (
    <TouchableOpacity
      style={[getWidth(width, marginHorizontal), style]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={[styles.container, colorStyle]}>
        <Text
          textColor={selected ? chipColor.foreground : Colors.text}
          fontSize={14}>
          {sliceString(title, 23)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (selectedColor, Colors) =>
  StyleSheet.create({
    selected: {
      backgroundColor: selectedColor.background_light,
      borderLeftWidth: 3,
      borderLeftColor: selectedColor.background,
      borderRightWidth: 3,
      borderRightColor: selectedColor.background,
    },
    notSelected: {
      backgroundColor: Colors.backgroundColor,
      borderLeftWidth: 3,
      borderLeftColor: selectedColor.background,
      borderRightWidth: 3,
      borderRightColor: selectedColor.background,
    },
  });

const getWidth = (width, margin) =>
  StyleSheet.create({
    width: width,
    marginHorizontal: margin,
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 5,
    marginVertical: 2,
    borderRadius: 20,
    elevation: 3,
  },
});

export default Chip;
