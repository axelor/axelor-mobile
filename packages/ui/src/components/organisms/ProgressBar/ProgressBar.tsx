/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useMemo, useEffect, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {ThemeColors, useThemeColor, Color} from '../../../theme';
import {Text} from '../../atoms';

type ProgressBarProps = {
  value?: number;
  total?: number;
  showPercent?: boolean;
  colorRepartition?: {[key: number]: Color};
  height?: number;
  style?: object;
  styleTxt?: object;
};

const ProgressBar = ({
  value = 0,
  total = 100,
  showPercent = true,
  colorRepartition = {},
  height = 30,
  style,
  styleTxt,
}: ProgressBarProps) => {
  const Colors = useThemeColor();
  const percent = total !== 0 ? (value / total) * 100 : 0;
  if (Object.keys(colorRepartition).length === 0) {
    colorRepartition = {
      0: Colors.errorColor,
      25: Colors.cautionColor,
      50: Colors.progressColor,
      75: Colors.priorityColor,
      100: Colors.successColor,
    };
  }

  let displayValue;
  if (showPercent) {
    displayValue = `${Math.round(percent)}%`;
  } else {
    null;
  }

  let color: Color = Colors.cautionColor;
  Object.keys(colorRepartition).forEach(key => {
    const threshold = parseInt(key, 10);
    if (percent >= threshold && colorRepartition[threshold]) {
      color = colorRepartition[threshold];
    }
  });
  const styles = useMemo(
    () => getStyles(Colors, height, color, percent),
    [Colors, height, color, percent],
  );

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [percent, animatedWidth]);

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}>
        <Text style={[styles.text, styleTxt]}>{displayValue}</Text>
      </Animated.View>
    </View>
  );
};

const getStyles = (Colors: ThemeColors, height: number, color, percent) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: height,
      borderRadius: 7,
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
      backgroundColor: Colors.backgroundColor,
    },
    progressBar: {
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.background,
      width: `${percent}%`,
      height: height,
    },
    text: {
      textAlign: 'center',
    },
  });

export default ProgressBar;
