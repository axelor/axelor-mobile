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
  style?: object;
  styleTxt?: object;
  value?: number;
  total?: number;
  showPercent?: boolean;
  centeredPercent?: boolean;
  colorRepartition?: {[key: number]: Color};
  height?: number;
  stripe?: boolean;
  stripeDuration?: number;
  stripeWidth?: number;
};

const ProgressBar = ({
  style,
  styleTxt,
  value = 0,
  total = 100,
  showPercent = true,
  centeredPercent = false,
  colorRepartition = {},
  height = 30,
  stripe = true,
  stripeDuration = 1000,
  stripeWidth = 40,
}: ProgressBarProps) => {
  const Colors = useThemeColor();

  const animatedStripe = useRef(new Animated.Value(0)).current;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

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

  const displayText = useMemo(() => {
    if (showPercent) {
      return `${percent.toFixed(2)}%`;
    }

    return `${value}/${total}`;
  }, [percent, showPercent, total, value]);

  const displayTextOutside = useMemo(() => {
    if (centeredPercent) {
      return true;
    }

    return progressBarWidth - textWidth * 1.3 < 0;
  }, [centeredPercent, progressBarWidth, textWidth]);

  const styles = useMemo(
    () =>
      getStyles(Colors, height, color, percent, stripeWidth, progressBarWidth),
    [Colors, height, color, percent, stripeWidth, progressBarWidth],
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
    outputRange: [-stripeWidth, progressBarWidth],
  });

  const renderPercent = useCallback(() => {
    return (
      <Text
        style={[styles.text, styleTxt]}
        onTextLayout={event => {
          setTextWidth(event.nativeEvent.lines?.[0]?.width);
        }}>
        {displayText}
      </Text>
    );
  }, [displayText, styles, styleTxt]);

  return (
    <View style={[styles.container, style]}>
      {displayTextOutside ? (
        <View style={centeredPercent ? styles.centeredPercent : styles.percent}>
          {renderPercent()}
        </View>
      ) : null}
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
        <Animated.View
          style={[
            stripe && percent < 100 ? styles.stripe : styles.none,
            {
              transform: [{translateX}],
            },
          ]}
        />
        {!displayTextOutside ? renderPercent() : null}
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
  progressBarWidth,
) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: height + 2,
      borderRadius: 8,
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
      backgroundColor: Colors.backgroundColor,
      borderWidth: 1,
      borderColor: Colors.secondaryColor.background,
      zIndex: 1,
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
    percent: {
      position: 'absolute',
      left: progressBarWidth + 5,
      top: height / 2 - 10,
    },
    centeredPercent: {
      position: 'absolute',
      left: '45%',
      top: height / 2 - 10,
      zIndex: 2,
    },
    none: {
      display: 'none',
    },
  });

export default ProgressBar;
