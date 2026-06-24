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
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {sliceString} from '../../../utils';
import {Text} from '../../atoms';

interface ChipProps {
  selected: boolean;
  title: string;
  onPress: () => void;
  selectedColor?: Color;
  width?: number | null;
  marginHorizontal?: number;
  readonly?: boolean;
  numberOfLines?: number;
  style?: any;
}

const Chip = ({
  selected,
  title,
  onPress,
  selectedColor,
  width = Dimensions.get('window').width * 0.4,
  marginHorizontal = 12,
  readonly = false,
  numberOfLines,
  style,
}: ChipProps) => {
  const Colors = useThemeColor();

  const chipColor = useMemo(() => {
    let _chipColor: Color = selectedColor ?? Colors.primaryColor;

    if (!selected) {
      _chipColor = {
        background: _chipColor.background,
        background_light: Colors.backgroundColor,
        foreground: Colors.text,
      };
    }

    return _chipColor;
  }, [Colors, selected, selectedColor]);

  const styles = useMemo(() => getStyles(chipColor), [chipColor]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {width: width, marginHorizontal: marginHorizontal},
        style,
      ]}
      disabled={readonly}
      onPress={onPress}
      activeOpacity={0.8}
      testID="chipTouchable">
      <Text
        style={[styles.text, selected ? styles.bold : null]}
        textColor={selected ? chipColor.background : Colors.text}
        numberOfLines={numberOfLines}
        fontSize={12}>
        {sliceString(title, 23)}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (chipColor: Color) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 5,
      marginVertical: 2,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: chipColor.background,
      backgroundColor: chipColor.background_light,
    },
    text: {
      textAlign: 'center',
    },
    bold: {
      fontWeight: 'bold',
    },
  });

export default Chip;
