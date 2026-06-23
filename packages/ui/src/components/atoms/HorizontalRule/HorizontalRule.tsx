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
import {View, StyleSheet} from 'react-native';
import {useThemeColor} from '../../../theme';

interface HorizontalRuleProps {
  style?: any;
  color?: string;
  width?: number;
}

const HorizontalRule = ({style, color, width}: HorizontalRuleProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(
    () => getStyles(color ?? Colors.secondaryColor.background, width),
    [Colors.secondaryColor.background, color, width],
  );

  return <View testID="horizontalRule" style={[styles.line, style]} />;
};

const getStyles = (_color: string, width?: number) =>
  StyleSheet.create({
    line: {
      borderBottomColor: _color,
      borderBottomWidth: width ?? 1,
    },
  });

export default HorizontalRule;
