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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Color, useThemeColor} from '@axelor/aos-mobile-ui';
import {HeaderBandHelper} from '../../../header';

const DELAY_BEFORE_ANIMATION = 3000;
const SCREEN_WIDTH = Dimensions.get('window').width;

interface HeaderBandProps {
  color: Color;
  text: string;
  showIf: boolean;
}

const HeaderBand = ({color, text, showIf}: HeaderBandProps) => {
  const Colors = useThemeColor();

  const [textWidth, setTextWidth] = useState(0);
  const textScrollX = useRef(new Animated.Value(0)).current;

  const styles = useMemo(
    () => getStyles(color || Colors.secondaryColor),
    [Colors, color],
  );

  const onTextLayout = useCallback(
    ({
      nativeEvent: {
        layout: {width},
      },
    }) => setTextWidth(width),
    [],
  );

  useEffect(() => {
    if (textWidth > SCREEN_WIDTH) {
      Animated.loop(
        Animated.sequence([
          Animated.delay(DELAY_BEFORE_ANIMATION),
          Animated.timing(textScrollX, {
            toValue: -textWidth,
            duration: textWidth * 15,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [textScrollX, textWidth]);

  if (!showIf) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        bounces={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}>
        <Animated.Text
          onLayout={onTextLayout}
          style={[
            styles.text,
            {
              transform: [{translateX: textScrollX}],
            },
          ]}>
          {text}
        </Animated.Text>
      </ScrollView>
    </View>
  );
};

const getStyles = (color: Color) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.background_light,
      justifyContent: 'center',
      alignItems: 'center',
      height: HeaderBandHelper.bandHeight,
    },
    text: {
      textAlign: 'center',
      fontSize: 12,
      paddingVertical: 3,
      color: color.foreground,
    },
  });

export default HeaderBand;
