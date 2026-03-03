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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../../atoms';
import {ThemeColors, useThemeColor} from '../../../theme';

const DEFAULT_SIZE = 20;

const RadioButton = ({
  style,
  onPress,
  selected,
  title,
  size = DEFAULT_SIZE,
  readonly = false,
}: {
  onPress: () => void;
  selected: boolean;
  readonly?: boolean;
  title: string;
  size?: number;
  style?: any;
}) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors, size), [Colors, size]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      disabled={readonly}
      style={[styles.container, selected ? styles.selectedCard : null, style]}>
      <View style={styles.buttonExt}>
        {selected ? <View testID="radio" style={styles.buttonInt} /> : null}
      </View>
      <Text
        textColor={readonly ? Colors.secondaryColor.background : Colors.text}
        style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (Colors: ThemeColors, size: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 5,
      flex: 1,
      minWidth: 100,
      padding: 10,
    },
    selectedCard: {
      backgroundColor: Colors.backgroundColor,
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
      borderRadius: 7,
      elevation: 2,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
    buttonExt: {
      alignItems: 'center',
      justifyContent: 'center',
      height: size,
      width: size,
      borderRadius: size,
      borderWidth: 1,
      borderColor: Colors.secondaryColor.background,
      backgroundColor: Colors.backgroundColor,
    },
    buttonInt: {
      height: size * 0.7,
      width: size * 0.7,
      borderRadius: size * 0.7,
      backgroundColor: Colors.primaryColor.background,
    },
    title: {
      marginLeft: 5,
    },
  });

export default RadioButton;
