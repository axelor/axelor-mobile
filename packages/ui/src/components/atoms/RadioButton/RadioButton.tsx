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
import {ThemeColors, useThemeColor} from '../../../theme';
import {getCommonStyles} from '../../../utils';
import {Text} from '../../atoms';

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

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, false, selected),
    [Colors, selected],
  );

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      disabled={readonly}
      style={[
        commonStyles.filter,
        styles.container,
        selected
          ? {backgroundColor: Colors.primaryColor.background_light}
          : null,
        style,
      ]}>
      <View style={styles.buttonExt}>
        {selected ? <View testID="radio" style={styles.buttonInt} /> : null}
      </View>
      <Text
        textColor={
          selected
            ? Colors.primaryColor.background
            : readonly
              ? Colors.secondaryColor.background
              : Colors.text
        }
        style={selected ? styles.boldText : undefined}>
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
      flex: 1,
      minWidth: 100,
      paddingHorizontal: 2,
      paddingVertical: 10,
    },
    buttonExt: {
      alignItems: 'center',
      justifyContent: 'center',
      height: size,
      width: size,
      borderRadius: size,
      borderWidth: 1,
      borderColor: Colors.secondaryColor.background_light,
      backgroundColor: Colors.backgroundColor,
      marginHorizontal: 5,
    },
    buttonInt: {
      height: size * 0.5,
      width: size * 0.5,
      borderRadius: size * 0.5,
      backgroundColor: Colors.primaryColor.background,
    },
    boldText: {
      fontWeight: 'bold',
    },
  });

export default RadioButton;
