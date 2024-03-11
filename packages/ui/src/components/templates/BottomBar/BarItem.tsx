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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {Color, useThemeColor} from '../../../theme';
import {checkNullString} from '../../../utils';
import {Button, NumberBubble} from '../../molecules';
import {Text} from '../../atoms';

const BarItem = ({
  iconName,
  color,
  title,
  isSelected = false,
  size,
  disabled,
  indicator,
  onPress,
}: {
  iconName: string;
  color?: Color;
  title?: string;
  isSelected: boolean;
  size: number;
  disabled?: boolean;
  indicator?: number;
  onPress: () => void;
}) => {
  const Colors = useThemeColor();

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(isSelected ? 1.2 : 1);
  }, [isSelected, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const buttonColor: Color = useMemo(
    () => color ?? Colors.primaryColor,
    [Colors.primaryColor, color],
  );

  const buttonSize: number = useMemo(
    () => (isSelected ? size * 1.2 : size),
    [isSelected, size],
  );

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Button
          iconName={iconName}
          color={buttonColor}
          disabled={disabled}
          onPress={onPress}
          width={size}
          style={{height: size}}
          iconSize={size * 0.6}
        />
      </Animated.View>
      {indicator > 0 && (
        <Animated.View style={[animatedStyle, styles.indicator]}>
          <NumberBubble
            number={indicator}
            color={buttonColor}
            isNeutralBackground={true}
            size={buttonSize * 0.6}
          />
        </Animated.View>
      )}
      {!checkNullString(title) && <Text>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 2,
    marginBottom: 6,
  },
  indicator: {
    position: 'absolute',
    top: -5,
    right: -10,
  },
  title: {
    marginTop: 4,
  },
});

export default BarItem;
