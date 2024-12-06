/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {HorizontalRule, useThemeColor} from '@axelor/aos-mobile-ui';

interface HorizontalRuleTextProps {
  text?: string;
  style?: any;
  textStyle?: any;
}

const HorizontalRuleText = ({
  text = '',
  style,
  textStyle,
}: HorizontalRuleTextProps) => {
  const Colors = useThemeColor();

  return (
    <View style={[styles.container, style]}>
      <HorizontalRule style={styles.line} />
      <Text
        style={[
          styles.text,
          {color: Colors.secondaryColor.foreground},
          textStyle,
        ]}>
        {text}
      </Text>
      <HorizontalRule style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HorizontalRuleText;
