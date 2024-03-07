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
  duration?: number;
}

const SentenceAnimatedScroller = ({
  sentence,
  duration = 5000,
}: SentenceScrollerProps) => {
  const scrollX = useRef(new Animated.Value(screenWidth)).current;
  const sentenceWidth = useMemo(() => sentence.length * 8, [sentence]);

  useEffect(() => {
    const scrollAnimation = Animated.timing(scrollX, {
      toValue: -sentenceWidth,
      duration,
      useNativeDriver: true,
    });

    const repeatAnimation = Animated.loop(scrollAnimation);

    repeatAnimation.start();

    return () => {
      repeatAnimation.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flexDirection: 'row',
          width: sentenceWidth,
          transform: [{translateX: scrollX}],
        }}>
        <Text>{sentence}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: 30,
  },
});

export default SentenceAnimatedScroller;
