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
import {StyleSheet, View, Dimensions} from 'react-native';
import {Text} from '../../atoms';
import {Color, useThemeColor} from '../../../theme';

const DEFAULT_SIZE = Dimensions.get('window').width * 0.07;

interface NumberBubbleProps {
  style?: any;
  number: number;
  color: Color;
  isNeutralBackground: boolean;
  size?: number;
}

const NumberBubble = ({
  style,
  number,
  color,
  isNeutralBackground = true,
  size = DEFAULT_SIZE,
}: NumberBubbleProps) => {
  const Colors = useThemeColor();

  const _color = useMemo(
    () =>
      isNeutralBackground
        ? {
            background: color.background,
            background_light: Colors.backgroundColor,
            foreground: Colors.text,
          }
        : color,
    [Colors, color, isNeutralBackground],
  );

  const styles = useMemo(() => getStyles(_color, size), [_color, size]);

  return (
    <View style={[styles.bubble, style]} testID="numberBubbleContainer">
      <Text textColor={_color.foreground} fontSize={size * 0.55}>
        {number}
      </Text>
    </View>
  );
};

const getStyles = (color: Color, size: number) =>
  StyleSheet.create({
    bubble: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      height: size,
      backgroundColor: color.background_light,
      borderColor: color.background,
      borderRadius: size,
      borderWidth: 2,
    },
  });

export default NumberBubble;
