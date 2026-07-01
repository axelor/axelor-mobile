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

import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useThemeColor} from '../../../theme';
import {HorizontalRule, Text} from '../../atoms';

interface HorizontalRuleTextProps {
  style?: any;
  textStyle?: any;
  lineStyle?: any;
  text: string;
  color?: string;
}

const HorizontalRuleText = ({
  style,
  textStyle,
  lineStyle,
  text,
  color: _color,
}: HorizontalRuleTextProps) => {
  const Colors = useThemeColor();

  const color = useMemo(
    () => _color ?? Colors.secondaryColor.background_light,
    [_color, Colors],
  );

  const renderLine = useCallback(
    () => <HorizontalRule style={[styles.line, lineStyle]} color={color} />,
    [color, lineStyle],
  );

  return (
    <View
      style={[styles.container, style]}
      testID="horizontalRuleTextContainer">
      {renderLine()}
      <Text style={[styles.text, textStyle]} textColor={color}>
        {text}
      </Text>
      {renderLine()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    paddingHorizontal: 10,
    gap: 10,
  },
  line: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
});

export default HorizontalRuleText;
