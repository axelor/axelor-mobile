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

import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, Dimensions, StatusBar, StyleSheet} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Text} from '../../atoms';

const HeaderIndicator = () => {
  const Colors = useThemeColor();
  const {isHeaderIndicatorVisible, headerIndicatorState} = useConfig();

  const translation = useRef(new Animated.Value(0)).current;

  const styles = useMemo(
    () =>
      getStyles(
        headerIndicatorState.color || Colors.secondaryColor.background_light,
        headerIndicatorState.textColor || Colors.text,
        translation,
      ),
    [Colors, headerIndicatorState, translation],
  );

  useEffect(() => {
    Animated.timing(translation, {
      toValue: isHeaderIndicatorVisible ? StatusBar.currentHeight : 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [translation, isHeaderIndicatorVisible]);

  return (
    <Animated.View style={styles.container}>
      <Text numberOfLines={1} style={styles.text}>
        {headerIndicatorState.text}
      </Text>
    </Animated.View>
  );
};

const getStyles = (color, textColor, translation) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('screen').width,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      transform: [
        {
          translateY: translation,
        },
      ],
      zIndex: 999,
    },
    text: {
      maxWidth: '80%',
      textAlign: 'center',
      fontSize: 12,
      paddingVertical: 3,
      color: textColor,
    },
  });

export default HeaderIndicator;
