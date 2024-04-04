/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {Text} from '../../atoms';

const {width: screenWidth} = Dimensions.get('window');
interface SentenceScrollerProps {
  sentence: string;
  textStyle?: any;
  /** Min: 10000 ms */
  duration?: number;
}

const DURATION_MIN = 10000;

const SentenceAnimatedScroller = ({
  sentence,
  textStyle,
  duration = DURATION_MIN,
}: SentenceScrollerProps) => {
  const scrollX = useRef(new Animated.Value(screenWidth)).current;
  const sentenceWidth = useMemo(() => sentence.length * 8, [sentence]);

  const styles = useMemo(() => {
    return getStyles(sentenceWidth, scrollX);
  }, [sentenceWidth, scrollX]);

  useEffect(() => {
    const scrollAnimation = Animated.timing(scrollX, {
      toValue: -sentenceWidth,
      duration: Math.max(duration, DURATION_MIN),
      useNativeDriver: true,
    });

    const repeatAnimation = Animated.loop(scrollAnimation);

    repeatAnimation.start();

    return () => {
      repeatAnimation.stop();
    };
  }, [duration, scrollX, sentenceWidth]);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.animatedContainer}>
        <Text style={textStyle}>{sentence}</Text>
      </Animated.View>
    </View>
  );
};

const getStyles = (sentenceWidth, scrollX) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    animatedContainer: {
      flexDirection: 'row',
      width: sentenceWidth,
      transform: [{translateX: scrollX}],
    },
  });

export default SentenceAnimatedScroller;
