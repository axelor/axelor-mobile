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
  numberOfLines?: number;
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
  numberOfLines,
  style,
}: ChipProps) => {
  const Colors = useThemeColor();

  const chipColor = useMemo(() => {
    let _chipColor: Color =
      selectedColor == null ? Colors.primaryColor : selectedColor;

    if (!selected) {
      _chipColor = {
        background: _chipColor.background,
        background_light: Colors.backgroundColor,
        foreground: Colors.text,
      };
    }

    return _chipColor;
  }, [Colors, selected, selectedColor]);

  const styles = useMemo(
    () => getStyles(chipColor, Colors),
    [Colors, chipColor],
  );

  return (
    <TouchableOpacity
      style={[{width: width, marginHorizontal: marginHorizontal}, style]}
      disabled={readonly}
      onPress={onPress}
      activeOpacity={0.8}
      testID="chipTouchable">
      <View style={styles.container} testID="chipContainer">
        <Text
          style={styles.text}
          textColor={selected ? chipColor.foreground : Colors.text}
          numberOfLines={numberOfLines}
          fontSize={14}>
          {sliceString(title, 23)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (chipColor: Color, Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 5,
      marginVertical: 2,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: chipColor.background,
      backgroundColor: chipColor.background_light,
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
    text: {
      textAlign: 'center',
    },
  });

export default Chip;
