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
import {StyleSheet} from 'react-native';
import {Text} from '../../atoms';
import {Color, useThemeColor} from '../../../theme';
import {checkNullString} from '../../../utils';

interface TextUnitProps {
  title?: string;
  value: string | number;
  unit: string;
  color?: Color;
  fontSize?: number;
  style?: any;
  numberOfLines?: number;
  defaultColor?: boolean;
}

const TextUnit = ({
  title,
  value,
  unit,
  color,
  fontSize = 22,
  style,
  numberOfLines,
  defaultColor = false,
}: TextUnitProps) => {
  const Colors = useThemeColor();

  const _color = useMemo(() => color || Colors.primaryColor, [color, Colors]);

  const _title = useMemo(
    () => !checkNullString(title) && `${title} : `,
    [title],
  );

  return (
    <Text
      textColor={defaultColor ? Colors.text : _color.background}
      fontSize={fontSize}
      style={[styles.text, style]}
      numberOfLines={numberOfLines}>
      {_title} {value} {unit}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '900',
  },
});

export default TextUnit;
