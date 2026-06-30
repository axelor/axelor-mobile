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
import {StyleSheet, View} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {Text} from '../../atoms';

interface BadgeProps {
  style?: any;
  txtStyle?: any;
  title: string | number;
  color?: Color;
  numberOfLines?: number;
  textSize?: number;
}

const Badge = ({
  style,
  txtStyle,
  title,
  color,
  numberOfLines = 1,
  textSize,
}: BadgeProps) => {
  const Colors = useThemeColor();

  const _color = useMemo(
    () => color || Colors.primaryColor,
    [Colors.primaryColor, color],
  );

  const styles = useMemo(() => getStyles(_color), [_color]);

  return (
    <View style={[styles.container, style]} testID="bagdeContainer">
      <Text
        style={[styles.text, txtStyle]}
        numberOfLines={numberOfLines}
        textColor={_color.background}
        fontSize={textSize ?? 12}>
        {title}
      </Text>
    </View>
  );
};

const getStyles = (color: Color) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.background_light,
      borderRadius: 20,
      margin: 2,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontWeight: 'bold',
    },
  });

export default Badge;
