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

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';

const WIDTH = 54;
const HEIGHT = 54;
const DEFAULT_RADIUS = 8;
const ROUNDED_RADIUS = WIDTH / 2;

const MenuIconButton = ({
  style,
  icon,
  onPress,
  color,
  subtitle,
  rounded = false,
  disabled = false,
}) => {
  const Colors = useThemeColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.95}>
      <View
        style={[
          styles.container,
          {borderRadius: rounded ? ROUNDED_RADIUS : DEFAULT_RADIUS},
          {
            backgroundColor: disabled
              ? Colors.secondaryColor.background_light
              : color
              ? color
              : Colors.backgroundColor,
          },
          style,
        ]}>
        <Icon
          size={32}
          name={icon}
          color={
            disabled
              ? Colors.secondaryColor.background
              : Colors.secondaryColor_dark.background
          }
        />
      </View>
      {subtitle && (
        <Text style={styles.moduleSubtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 2,
  },
  moduleSubtitle: {
    fontSize: 10,
    maxWidth: 54,
    alignSelf: 'center',
  },
});

export default MenuIconButton;
