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
import {StyleSheet, View, Animated, Dimensions} from 'react-native';
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
  stripe?: boolean;
  stripeDuration?: number;
  stripeWidth?: number;
};

const ProgressBar = ({
  value = 0,
  total = 100,
  showPercent = true,
  colorRepartition = {},
  stripe = true,
  height = 30,
  stripeDuration = 1000,
  stripeWidth = 40,
  style,
  styleTxt,
}: ProgressBarProps) => {
  const Colors = useThemeColor();
  const percent = total !== 0 ? (value / total) * 100 : 0;
  const animatedStripe = useRef(new Animated.Value(0)).current;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  if (Object.keys(colorRepartition).length === 0) {
    colorRepartition = {
      0: Colors.errorColor,
      25: Colors.cautionColor,
      50: Colors.progressColor,
      75: Colors.priorityColor,
      100: Colors.successColor,
    };
  }

  let color: Color = Colors.cautionColor;
  Object.keys(colorRepartition).forEach(key => {
    const threshold = parseInt(key, 10);
    if (percent >= threshold && colorRepartition[threshold]) {
      color = colorRepartition[threshold];
    }
  });

  const styles = useMemo(
    () => getStyles(Colors, height, color, percent, stripeWidth),
    [Colors, height, color, percent, stripeWidth],
  );

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [percent, animatedWidth]);

  useEffect(() => {
    const stripeAnimation = Animated.loop(
      Animated.timing(animatedStripe, {
        toValue: 1,
        duration: stripeDuration,
        useNativeDriver: true,
      }),
    );
    stripeAnimation.start();
  }, [animatedStripe, stripeDuration]);

  const translateX = animatedStripe.interpolate({
    inputRange: [0, 1],
    outputRange: [-stripeWidth, Dimensions.get('window').width],
  });

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
        {stripe && percent < 100 && (
          <Animated.View
            style={[
              styles.stripe,
              {
                transform: [{translateX}],
              },
            ]}
          />
        )}
        {showPercent && (
          <Text style={[styles.text, styleTxt]}>{`${Math.round(
            percent,
          )}%`}</Text>
        )}
      </Animated.View>
    </View>
  );
};

const getStyles = (
  Colors: ThemeColors,
  height: number,
  color,
  percent,
  stripeWidth,
) =>
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
      overflow: 'hidden',
    },
    stripe: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: stripeWidth,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    text: {
      textAlign: 'center',
    },
  });

export default ProgressBar;
