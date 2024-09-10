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
import {Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from '../../atoms';
import {Color, ThemeColors, useThemeColor} from '../../../theme';
import {sliceString} from '../../../utils/strings';

interface ChipProps {
  selected: boolean;
  title: string;
  onPress: () => void;
  selectedColor?: Color;
  width?: number;
  marginHorizontal?: number;
  readonly?: boolean;
  style?: any;
}

const Chip = ({
  selected,
  title,
  onPress,
  selectedColor = null,
  width = Dimensions.get('window').width * 0.4,
  marginHorizontal = 12,
  readonly = false,
  style,
}: ChipProps) => {
  const Colors = useThemeColor();
  const chipColor = useMemo(
    () => (selectedColor == null ? Colors.primaryColor : selectedColor),
    [Colors.primaryColor, selectedColor],
  );

  const styles = useMemo(
    () => getStyles(chipColor, Colors),
    [Colors, chipColor],
  );

  return (
    <TouchableOpacity
      style={[getWidth(width, marginHorizontal), style]}
      disabled={readonly}
      onPress={onPress}
      activeOpacity={0.8}>
      <View
        style={[
          styles.container,
          selected ? styles.selected : styles.notSelected,
        ]}>
        <Text
          textColor={selected ? chipColor.foreground : Colors.text}
          fontSize={14}>
          {sliceString(title, 23)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (selectedColor: Color, Colors: ThemeColors) =>
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
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      paddingVertical: 5,
      marginVertical: 2,
      borderRadius: 20,
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
  });

const getWidth = (width, margin) => ({
  width: width,
  marginHorizontal: margin,
});

export default Chip;
