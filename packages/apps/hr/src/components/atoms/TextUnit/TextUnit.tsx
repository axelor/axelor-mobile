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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Color, Text, useThemeColor} from '@axelor/aos-mobile-ui';

interface TextUnitProps {
  value: string | number;
  unit: string;
  color?: Color;
  fontSize?: number;
  style?: any;
}

const TextUnit = ({
  value,
  unit,
  color,
  fontSize = 22,
  style,
}: TextUnitProps) => {
  const Colors = useThemeColor();

  const _color = useMemo(() => color || Colors.primaryColor, [color, Colors]);

  return (
    <Text
      textColor={_color.background}
      fontSize={fontSize}
      style={[styles.text, style]}>
      {value} {unit}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '900',
  },
});

export default TextUnit;
