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

import React, {useMemo, useEffect, useRef, useCallback, useState} from 'react';
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
  const animatedStripe = useRef(new Animated.Value(0)).current;
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const percent = useMemo(
    () => (total !== 0 ? (value / total) * 100 : 0),
    [total, value],
  );

  const progressColors = useMemo(() => {
    if (Object.keys(colorRepartition).length === 0) {
      return {
        0: Colors.errorColor,
        25: Colors.cautionColor,
        50: Colors.progressColor,
        75: Colors.priorityColor,
        100: Colors.successColor,
      };
    }
    return colorRepartition;
  }, [Colors, colorRepartition]);

  let color: Color = Colors.cautionColor;
  Object.keys(progressColors).forEach(key => {
    const threshold = parseInt(key, 10);
    if (percent >= threshold && progressColors[threshold]) {
      color = progressColors[threshold];
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
  }, [animatedStripe, stripeDuration, value]);

  const translateX = animatedStripe.interpolate({
    inputRange: [0, 1],
    outputRange: [-stripeWidth, progressBarWidth],
  });

  const renderPercent = useCallback(() => {
    if (showPercent) {
      return (
        <Text style={[styles.text, styleTxt]}>{`${percent.toFixed(2)}%`}</Text>
      );
    } else {
      return <Text style={[styles.text, styleTxt]}>{`${value}/${total}`}</Text>;
    }
  }, [percent, showPercent, styles, styleTxt, total, value]);

  return (
    <View style={[styles.container, style]}>
      {percent <= 5 && <View style={styles.percent}>{renderPercent()}</View>}
      <Animated.View
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setProgressBarWidth(width);
        }}
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
        {percent > 5 && renderPercent()}
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
      borderWidth: 1,
      borderColor: Colors.secondaryColor.background,
    },
    progressBar: {
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.background,
      width: `${percent}%`,
      maxWidth: '100%',
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
    percent: {position: 'absolute', left: '50%', top: '25%'},
  });

export default ProgressBar;
